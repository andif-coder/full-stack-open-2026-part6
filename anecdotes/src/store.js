import { create } from 'zustand'
import anecdotesService from './services/anecdotes'

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
			if (a === undefined) {
				throw new Error(`Assertion failed: anecdote with id '${id}' does not exist`)
			}
			const updateObj = { ...a, votes: a.votes + 1 }
			const response = await anecdotesService.update(id, updateObj)
			console.log('cwj addVotes', response)
			set(state => ({
				anecdotes: state.anecdotes.map(as => as.id === id ? response : as)
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
		removeAnecdote: async (id) => {
			await anecdotesService.remove(id)
			set(state => ({
				anecdotes: state.anecdotes.filter(a => a.id !== id)
			}))
		}
	},
}))

export const useAnecdotesFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotes = () => {
	const anecdotes =  useAnecdoteStore(state => state.anecdotes)
	const filter =  useAnecdoteStore(state => state.filter)
	const filtered = anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
	return [...filtered].sort((a, b) => b.votes - a.votes)
}
export const useAnecdotesControls = () => useAnecdoteStore((state) => state.actions)

const useNotificationStore = create((set) => ({
	msg: '',
	actions: {
		setMsg: (newMsg) => {
			set(() => ({ msg: newMsg }))
		},
	}
}))
export const useNotificationMsg = () => useNotificationStore(state => state.msg)
export const useNotificationControls = () => useNotificationStore(state => state.actions)
