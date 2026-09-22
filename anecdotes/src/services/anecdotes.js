const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
	const response = await fetch(baseUrl)
	if (!response.ok) {
		throw new Error(`GET error: ${response.status} ${response.statusText}`)
	}
	return await response.json()
}
const create = async (newObj) => {
	const response = await fetch(baseUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newObj),
	})
	if (!response.ok) {
		throw new Error(`POST error: ${response.status}`)
	}
	return await response.json()
}
const update = async (id, updateObj) => {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updateObj)
	})
	if (!response.ok) {
		throw new Error(`PUT error: ${response.status} ${response.statusText}`)
	}
	return await response.json()
}
const remove = async (id) => {
	const response = await fetch(`${baseUrl}/${id}`, {
		method: 'DELETE',
	})
	if (!response.ok) {
		throw new Error(`DELETE error: ${response.status} ${response.statusText}`)
	}
}
export default { getAll, create, update, remove }
