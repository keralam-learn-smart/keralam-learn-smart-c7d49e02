import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export function createOpenAiProvider(openAiApiKey: string) {
  return createOpenAICompatible({
    name: "openai",
    baseURL: "https://api.openai.com/v1",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
    },
  });
}
