import { useMemo } from 'react'
import type { LLMOptions } from '@extension/llm'
import { LLM } from '@extension/llm'

export type UseLLMProps = LLMOptions

export const useLLM = (props: UseLLMProps) => {
  return useMemo(() => {
    return new LLM(props)
  }, [props])
}
