import { useMemo } from 'react'
import type { LLMOptions } from '@extension/llm'
import { LLM } from '@extension/llm'

export interface UseLLMProps extends LLMOptions {}

export const useLLM = ({ provider, apiKey, model }: UseLLMProps) => {
  return useMemo(() => {
    return new LLM({
      provider,
      apiKey,
      model,
    })
  }, [provider, apiKey, model])
}
