import '@src/Popup.css'
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared'
import { apiKeyDataStorage, exampleThemeStorage } from '@extension/storage'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'

export const supportedModels = [
  {
    provider: 'openai',
    models: ['gpt-3.5-turbo'],
  },
  {
    provider: 'anthropic',
    models: ['claude-3-haiku-20240307'],
  },
]

const Popup = () => {
  const apiKeyData = useStorage(apiKeyDataStorage)

  const [provider, setProvider] = useState<string>(apiKeyData.provider)
  const [model, setModel] = useState<string>(apiKeyData.model)
  const [models, setModels] = useState<string[]>([])

  const [apiKey, setApiKey] = useState<string>(apiKeyData.apiKey)

  useEffect(() => {
    const found = supportedModels.find(model => model.provider === provider)
    if (found) {
      setModels(found.models)
    }
  }, [provider])

  return (
    <>
      <div>
        <select value={provider} onChange={e => setProvider(e.target.value)}>
          {supportedModels.map(model => (
            <option key={model.provider} value={model.provider}>
              {model.provider}
            </option>
          ))}
        </select>

        <select value={model} onChange={e => setModel(e.target.value)}>
          {models.map(model => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>

        <input type="text" value={apiKey} onChange={e => setApiKey(e.target.value)} />

        <button
          onClick={async () => {
            await apiKeyDataStorage.set({
              apiKey,
              provider,
              model,
            })
          }}>
          Save
        </button>
      </div>
    </>
  )
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>)
