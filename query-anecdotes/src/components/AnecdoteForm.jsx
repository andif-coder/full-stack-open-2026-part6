import { useAnecdotes } from "../hooks/useAnecdotes"
import useNotification from "../hooks/useNotification"
const AnecdoteForm = () => {
  console.log('new anecdote1')
	const { addAnecdotes } = useAnecdotes()
	const { showMsg } = useNotification()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
		addAnecdotes(content)
		showMsg(`${content} is created`)
    event.target.reset()
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
