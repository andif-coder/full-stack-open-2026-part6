import { useAnecdotesControls } from "../store"
const AnecdoteForm = () => {
	const addAs = useAnecdotesControls().addAs

	const newAs = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		addAs(content)
		event.target.reset()
	}

	return (
		<div>
      <h2>create new</h2>
      <form onSubmit={newAs}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
		</div>
	)
}
export default AnecdoteForm
