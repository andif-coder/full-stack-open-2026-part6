import { create } from 'zustand'
import anecdotesService from './services/anecdotes'

// const anecdotesAtStart = [
//   'Make it work, then make it fast',
//   'There are two hard things in computer science',
//   'Untested code is broken code',
//   'Simplicity is the ultimate sophistication',
//   'Real artists ship code'
// ]

// const initialAnecdotes = [
//   { content: "Make it work, then make it fast", id: "5", votes: 0 },
//   { content: "There are two hard things in computer science", id: "4", votes: 1 },
//   { content: "Untested code is broken code", id: "3", votes: 3 },
//   { content: "Simplicity is the ultimate sophistication", id: "2", votes: 5 },
//   { content: "Real artists ship code", id: "1", votes: 7 },
// ]

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
	filter: '',
  actions: {
		addVotes: async (id) => {
			const a = get().anecdotes.find(a => a.id === id)
			const updateObj = { ...a, votes: a.votes + 1 }
			const response = await anecdotesService.update(id, updateObj)
			console.log('cwj addVotes', response)
			set(state => ({
				anecdotes: state.anecdotes.map(as => as.id == id ? response : as)
			}))
		},
		addAs: async (content) => {
			const newObj = { content, votes: 0 }
			const response = await anecdotesService.create(newObj)
			console.log('cwj addas', response)
			set(state => ({ anecdotes: state.anecdotes.concat(response) }))
		},
		changeFilter: (f) => set(() => ({ filter: f })),
		initAnecdotes: async () => {
			const initialAnecdotes = await anecdotesService.getAll()
			set(() => ({ anecdotes: initialAnecdotes }))
		},
	},
}))

export const useAnecdotesFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotes = () => useAnecdoteStore((state) => state.anecdotes)
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)
