const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY
const DEFAULT_MODEL = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4o-mini'

export const isOpenAIEnabled = Boolean(OPENAI_API_KEY)

const buildHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${OPENAI_API_KEY}`,
})

export const callOpenAIChat = async (messages, options = {}) => {
  if (!isOpenAIEnabled) {
    throw new Error('OpenAI API key is not configured.')
  }

  const body = {
    model: DEFAULT_MODEL,
    temperature: 0.3,
    ...options,
    messages,
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `OpenAI request failed (${response.status}): ${errorText || response.statusText}`,
    )
  }

  const data = await response.json()
  const content = data?.choices?.[0]?.message?.content

  if (!content) {
    throw new Error('OpenAI response did not include any content.')
  }

  return content.trim()
}

