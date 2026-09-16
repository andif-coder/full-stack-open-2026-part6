import { useAnecdotes, useAnecdotesControls, useAnecdotesFilter } from "../store"
const AnecdoteList = () => {
	const filter = useAnecdotesFilter()
  const anecdotes = useAnecdotes()
	const addVotes = useAnecdotesControls().addVotes
  const vote = (id) => {
    console.log("vote", id)
		addVotes(id)
  }
	console.log('cwj filter:', filter)
	return (
		<div>
			{anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).toSorted((a, b) => b.votes - a.votes).map((anecdote) => (
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
