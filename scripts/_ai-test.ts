import { generateText, Output } from "ai";
import { z } from "zod";

async function main() {
  const { experimental_output } = await generateText({
    model: "anthropic/claude-haiku-4.5",
    output: Output.object({ schema: z.object({ tools: z.array(z.string()).min(3).max(5) }) }),
    prompt: "List 3 tools for Bowling",
  });
  console.log(JSON.stringify(experimental_output));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
