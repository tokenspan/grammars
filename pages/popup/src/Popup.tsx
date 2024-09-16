import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared'
import { configStorage } from '@extension/storage'
import { useMemo, useState } from 'react'
import type { LLMOptions } from '@extension/llm'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useAsyncEffect from 'use-async-effect'
import { Switch } from '@/components/ui/switch'
import { Logo } from '@/components/logo'
import { useDebouncedCallback } from 'use-debounce'

export const SUPPORTED_MODELS = [
  {
    model: 'gpt-3.5-turbo',
    provider: 'openai',
  },
  {
    model: 'claude-3-haiku-20240307',
    provider: 'anthropic',
  },
]

const Popup = () => {
  const configData = useStorage(configStorage)

  const [model, setModel] = useState<string>(configData.model)
  const [apiKey, setApiKey] = useState<string>('')
  const [host] = useState<string>(configData.currentTabHost)
  const hasDisabledHost = useMemo(() => configData.disabledHosts?.includes(host), [configData.disabledHosts, host])

  useAsyncEffect(async () => {
    const apiKeys = configData.apiKeys ?? {}
    setApiKey(apiKeys[model] ?? '')
  }, [configData, model])

  useAsyncEffect(async () => {
    await configStorage.set({
      ...configData,
      model,
    })
  }, [configData, model])

  const handleUpdateApiKey = useDebouncedCallback(
    // function
    async (value: string) => {
      const apiKeys = configData.apiKeys ?? {}
      await configStorage.set({
        ...configData,
        apiKeys: {
          ...apiKeys,
          [model]: value,
        },
      })
    },
    // delay in ms
    200,
  )

  return (
    <>
      <div className="">
        <div className="mb-3 p-3 border-b border-gray-200 flex items-center">
          <Logo />
          <p className="ml-2 font-semibold">Grammars</p>
        </div>
        <div className="px-3 pb-3">
          <div className="mb-3 flex items-center justify-between">
            <Label htmlFor="airplane-mode">
              Disable for <span className="underline">{host}</span>
            </Label>
            <Switch
              id="airplane-mode"
              checked={hasDisabledHost}
              onCheckedChange={async checked => {
                if (checked) {
                  const disabledHosts = configData.disabledHosts ?? []
                  await configStorage.set({
                    ...configData,
                    disabledHosts: Array.from(new Set([...disabledHosts, host])),
                  })
                }
              }}
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="provider">Model</Label>
            <Select onValueChange={value => setModel(value as LLMOptions['model'])} defaultValue={model} value={model}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_MODELS.map(value => (
                    <SelectItem key={value.model} value={value.model}>
                      {value.model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mb-3">
            <Label htmlFor="email">API Key</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your API key"
              defaultValue={apiKey}
              onChange={async e => {
                setApiKey(e.target.value)
                await handleUpdateApiKey(e.target.value)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>)
