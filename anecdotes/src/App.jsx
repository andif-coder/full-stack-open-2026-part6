import { useAnecdotes, useAnecdotesControls, asObject } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
	const { addVotes, addAs } = useAnecdotesControls()

  const vote = (id) => {
    console.log("vote", id)
		addVotes(id)
  }
	const newAs = (event) => {
		event.preventDefault()
		const content = event.target.asValue.value
		addAs(asObject(content))
		event.target.reset()
	}

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App
