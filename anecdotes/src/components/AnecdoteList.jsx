import { useAnecdotes, useAnecdotesControls } from "../store"
const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
	const addVotes = useAnecdotesControls().addVotes
  const vote = (id) => {
    console.log("vote", id)
		addVotes(id)
  }
	return (
		<div>
			{anecdotes.toSorted((a, b) => b.votes - a.votes).map((anecdote) => (
  		  <div key={anecdote.id}>
  		    <div>{anecdote.content}</div>
  		    <div>
  		      has {anecdote.votes}
  		      <button onClick={() => vote(anecdote.id)}>vote</button>
  		    </div>
  		  </div>
  		))}
		</div>
	)
}
export default AnecdoteList
