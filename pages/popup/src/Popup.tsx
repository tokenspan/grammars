import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared'
import { apiKeyDataStorage } from '@extension/storage'
import { useEffect, useState } from 'react'
import type { LLMOptions } from '@extension/llm'
import { Button } from '@/components/ui/button'

export const supportedModels = [
  {
    provider: 'openai',
    models: ['gpt-3.5-turbo'],
  },
  // {
  //   provider: 'anthropic',
  //   models: ['claude-3-haiku-20240307'],
  // },
]

const Popup = () => {
  const apiKeyData = useStorage(apiKeyDataStorage)

  const [provider, setProvider] = useState<LLMOptions['provider']>(apiKeyData.provider)
  const [model, setModel] = useState<LLMOptions['model']>(apiKeyData.model)
  const [models, setModels] = useState<string[]>([])

  const [apiKey, setApiKey] = useState<string>('')

  // const llm = useLLM({
  //   provider,
  //   apiKey,
  //   model,
  // })
  // const { correctedText, currentText, correct } = useCorrection(llm)

  useEffect(() => {
    const apiKeys = apiKeyData.apiKeys ?? {}
    setApiKey(apiKeys[provider] ?? '')
  }, [apiKeyData, provider])

  useEffect(() => {
    const found = supportedModels.find(model => model.provider === provider)
    if (found) {
      setModels(found.models)
    }
  }, [provider])

  return (
    <>
      <div className="w-[400px]  ">
        <div className="w-full p-6">
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="provider">
              Provider
            </label>
            <select
              id="provider"
              className="w-1/2 border appearance-none rounded-lg bg-white/5 py-1.5 px-3 text-sm focus-visible:ring-0 focus:outline-none"
              value={provider}
              onChange={e => setProvider(e.target.value as unknown as LLMOptions['provider'])}>
              {supportedModels.map(model => (
                <option key={model.provider} value={model.provider}>
                  {model.provider}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="model">
              Model
            </label>
            <select
              id="model"
              className="w-1/2 border appearance-none rounded-lg bg-white/5 py-1.5 px-3 text-sm focus-visible:ring-0 focus:outline-none"
              value={model}
              onChange={e => setModel(e.target.value as unknown as LLMOptions['model'])}>
              {models.map(model => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="flex flex-col">
            <label htmlFor="apikey">API Key</label>
            <input
              className="border rounded-lg w-1/2 py-1.5 px-3 text-sm focus-visible:ring-0 focus:outline-none"
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
            />
          </div>
          <br />
          <button
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={async () => {
              const apiKeys = { ...apiKeyData.apiKeys, [provider]: apiKey }

              await apiKeyDataStorage.set({
                apiKeys,
                provider,
                model,
              })
            }}>
            Save
          </button>
          <Button>Click me</Button>
        </div>
      </div>
      {/*<br />*/}

      {/*<div>*/}
      {/*  Current Text: {currentText}*/}
      {/*  <br />*/}
      {/*  Corrected Text: {correctedText}*/}
      {/*</div>*/}

      {/*<button*/}
      {/*  className="border"*/}
      {/*  onClick={async () => {*/}
      {/*    await correct("Adam told me we wasn't have any food so I said that I is some on the way home.")*/}
      {/*  }}>*/}
      {/*  Test*/}
      {/*</button>*/}
      {/*<br />*/}
    </>
  )
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>)
