import { useAnecdotesControls } from "../store"
import { useNotificationControls } from "../store"
const AnecdoteForm = () => {
	const addAs = useAnecdotesControls().addAs
	const setMsg = useNotificationControls().setMsg

	const newAs = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		addAs(content)
		setMsg(`${content} is created`)
		setTimeout(() => {
			setMsg('')
		}, 5000)
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
