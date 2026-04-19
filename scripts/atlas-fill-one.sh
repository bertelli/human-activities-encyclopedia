#!/bin/bash
set -uo pipefail

PROJECT_DIR="/Users/francescobertelli-mini/Documents/human-activities-encyclopedia"
OPENCLAW="/opt/homebrew/bin/openclaw"
cd "$PROJECT_DIR"

# 1. Pick a pending activity
ACTIVITY=$(npx dotenv -e .env.local -- npx tsx scripts/atlas-pick-pending.ts 2>&1)
PICK_EXIT=$?
if [ $PICK_EXIT -eq 2 ]; then
  echo "no pending activities" >&2
  exit 0
fi
if [ $PICK_EXIT -ne 0 ]; then
  echo "pick failed: $ACTIVITY" >&2
  exit 1
fi

# 2. Build prompt and invoke the agent externally (not recursively)
PROMPT="You are filling the Human Activity Atlas encyclopedia.

Activity data (JSON): $ACTIVITY

Output a SINGLE JSON OBJECT with these fields. No markdown, no prose, no code fences, no commentary — pure JSON only.

{
  \"id\": <integer from activity data>,
  \"description\": \"2 paragraphs, 200-250 words total. Para 1 = what it is + who does it. Para 2 = how it is practised + community + events. Friendly tone.\",
  \"tools\": [ /* 10+ specific physical tools/equipment, concrete brand-agnostic names */ ],
  \"glossary\": [ /* 18+ {term, definition} of real insider jargon, one-sentence factual definitions */ ],
  \"brands\": [ /* 8+ {name, note} real companies/products with a short note each */ ],
  \"techniques\": [ /* 10+ {name, description} named techniques/styles with a short factual description each */ ],
  \"masters\": [ /* 6+ {name, note} real people known for the activity with a short note each */ ],
  \"iconVoxels\": { \"primitives\": [
      /* 4-12 primitives building a recognisable 3D silhouette of the activity, coords in -15..15, Y up */
  ] }
}

Voxel DSL primitive types:
  { \"type\":\"filledSphere\", \"r\":N, \"cx\":0, \"cy\":0, \"cz\":0 }
  { \"type\":\"sphere\",       \"r\":N, \"cx\":0, \"cy\":0, \"cz\":0 }
  { \"type\":\"box\",          \"x\":[a,b], \"y\":[a,b], \"z\":[a,b], \"hollow\":false }
  { \"type\":\"cylinderY\",    \"r\":N, \"yMin\":a, \"yMax\":b, \"cx\":0, \"cz\":0 }
  { \"type\":\"cylinderX\",    \"r\":N, \"xMin\":a, \"xMax\":b, \"cy\":0, \"cz\":0 }
  { \"type\":\"cylinderZ\",    \"r\":N, \"zMin\":a, \"zMax\":b, \"cx\":0, \"cy\":0 }
  { \"type\":\"discY\",        \"r\":N, \"y\":a, \"cx\":0, \"cz\":0 }
  { \"type\":\"line\",         \"from\":[x,y,z], \"to\":[x,y,z] }

Think ICONIC silhouettes — the most universally recognisable shape for the activity. For vehicles: a sports car (low sleek wedge profile like Ferrari/Corvette) not a boxy sedan. For instruments: a Stratocaster not a generic rectangle. For tools: the distinctive shape people picture first. Use slanted boxes and overlapping primitives to suggest curves and angles — avoid symmetrical boxy defaults.

Examples: cake-carving = cylinderY tiers decreasing radius. Airsoft = box barrel + box receiver + line stock. Pottery = cylinderY vessel + discY wheel + filledSphere clay ball. Car restoration = low sloped box hood + raked windshield box + rounded rear box + 4 cylinderY wheels — think classic sports car proportions.

Respond with ONLY the JSON object."

SESSION_ID="atlas-fill-$(date +%s)-$$"
REPLY=$("$OPENCLAW" agent \
  --session-id "$SESSION_ID" \
  --message "$PROMPT" \
  --json \
  --timeout 180 2>&1)
AGENT_EXIT=$?

if [ $AGENT_EXIT -ne 0 ]; then
  echo "openclaw agent exit $AGENT_EXIT" >&2
  echo "$REPLY" | tail -c 500 >&2
  exit 1
fi

CONTENT=$(echo "$REPLY" | python3 -c '
import sys, json
raw = sys.stdin.read()
start = raw.find("{")
if start < 0:
    sys.stderr.write("no JSON object in reply\n"); sys.exit(1)
try:
    # strict=False tolerates literal control chars (newlines) inside strings
    d = json.loads(raw[start:], strict=False)
except Exception as e:
    sys.stderr.write(f"parse fail: {e}\n"); sys.exit(1)
res = d.get("result") or d
txt = res.get("finalAssistantRawText") or res.get("finalAssistantVisibleText") or ""
if not txt:
    for p in res.get("payloads") or []:
        if isinstance(p, dict) and isinstance(p.get("text"), str):
            txt = p["text"]; break
sys.stdout.write(txt)')

if [ -z "$CONTENT" ]; then
  echo "empty assistant text" >&2
  echo "$REPLY" | head -c 500 >&2
  exit 1
fi

# 3. Write to DB
echo "$CONTENT" | npx dotenv -e .env.local -- npx tsx scripts/atlas-write-content.ts
WRITE_EXIT=$?
if [ $WRITE_EXIT -ne 0 ]; then
  exit $WRITE_EXIT
fi

# 4. Trigger a Vercel prod deploy so the live site picks up the new content
#    Deploy runs in the background — fire-and-forget, we don't block on build completion
nohup /opt/homebrew/bin/vercel --cwd "$PROJECT_DIR" --prod --yes > /tmp/atlas-deploy-$(date +%s).log 2>&1 &
disown
echo "deploy triggered (background)" >&2
