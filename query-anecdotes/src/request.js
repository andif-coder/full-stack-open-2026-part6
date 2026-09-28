const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
	const response = await fetch(baseUrl)
	if (!response.ok) {
		throw new Error(`GET error: ${response.status} ${response.statusText}`)
	}
	return await response.json()
}
