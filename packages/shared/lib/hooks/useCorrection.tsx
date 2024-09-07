import type { LLM } from '@extension/llm'
import { useState } from 'react'
import { correctText } from '@extension/core'

export const useCorrection = (llm: LLM) => {
  const [currentText, setCurrentText] = useState<string | null>(null)
  const [correctedText, setCorrectedText] = useState<string | null>(null)

  const correct = async (text: string) => {
    if (text === currentText) {
      return
    }

    const corrected = await correctText(llm, text)
    setCorrectedText(corrected)
    setCurrentText(text)
  }

  return {
    correctedText,
    currentText,
    correct,
  }
}
