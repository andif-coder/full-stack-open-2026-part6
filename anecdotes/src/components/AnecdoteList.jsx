import { useAnecdotes, useAnecdotesControls, useAnecdotesFilter } from "../store"
import { useNotificationControls } from "../store"
import { useEffect } from "react"
const AnecdoteList = () => {
	const filter = useAnecdotesFilter()
  const anecdotes = useAnecdotes()
	const { addVotes, initAnecdotes, removeAnecdote } = useAnecdotesControls()
	const setMsg  = useNotificationControls().setMsg
	useEffect(() => {
		initAnecdotes()
	}, [initAnecdotes])
  const vote = (anecdote) => {
		setMsg(`You voted '${anecdote.content}'`)
		setTimeout(() => {
			setMsg('')
		}, 5000)
		addVotes(anecdote.id)
  }
	const remove = (id) => {
		removeAnecdote(id)
	}
	// console.log('cwj filter:', filter)
	// console.log('cwj anecdotes: ', anecdotes)
	return (
		<div>
			{anecdotes.map((anecdote) => (
  		  <div key={anecdote.id}>
  		    <div>{anecdote.content}</div>
  		    <div>
  		      has {anecdote.votes}
  		      <button onClick={() => vote(anecdote)}>vote</button>
						{anecdote.votes === 0&& <button onClick={() => remove(anecdote.id)}>delete</button>}
  		    </div>
  		  </div>
  		))}
		</div>
	)
}
export default AnecdoteList
