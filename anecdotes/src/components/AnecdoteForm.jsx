import { useAnecdotesControls, asObject } from "../store"
const AnecdoteForm = () => {
	const addAs = useAnecdotesControls().addAs

	const newAs = (event) => {
		event.preventDefault()
		const content = event.target.asValue.value
		addAs(asObject(content))
		event.target.reset()
	}

	return (
		<div>
      <h2>create new</h2>
      <form onSubmit={newAs}>
        <div>
          <input data-testid="new" name="asValue" />
        </div>
        <button type="submit">create</button>
      </form>
		</div>
	)
}
export default AnecdoteForm
