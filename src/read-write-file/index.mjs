import { readFile, writeFile } from 'fs/promises'

try {
  const controller = new AbortController()
  const { signal } = controller
  let template = await readFile(
    new URL('./input/template.html', import.meta.url),
    {
      encoding: 'utf-8',
      flag: 'r+',
      signal,
    }
  )
  const data = {
    title: 'Title by node app22',
    body: 'Body by node app',
  }

  for (const [key, val] of Object.entries(data)) {
    template = template.replace(`{${key}}`, val)
  }

  await writeFile(new URL('./output/template.html', import.meta.url), template)
} catch (error) {
  // When a request is aborted - err is an AbortError
  console.error(error)
}

process.on('uncaughtException', () => {
  console.log('uncaught exception')
})
