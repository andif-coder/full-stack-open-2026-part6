import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addAnecdotesToService, addVote } from '../request'
import useNotification from './useNotification'

export const useAnecdotes = () => {
	const queryClient = useQueryClient()
	const { showMsg } = useNotification()
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
	})
	const addAnecdotesMutation = useMutation({
		mutationFn: addAnecdotesToService,
		onSuccess: (newAnecdote) => {
			showMsg(`${newAnecdote.content} is created`)
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
		},
		onError: () => {
			showMsg('too short anecdote, must have length 5 or more')
		},
	})
	const addVoteMutation = useMutation({
		mutationFn: addVote,
		onSuccess: (updatedAnecdote) => {
			showMsg(`You voted '${updatedAnecdote.content}'`)
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.map(a => updatedAnecdote.id === a.id ? updatedAnecdote : a))
		},
	})
	return {
		anecdotes: result.data,
		isPending: result.isPending,
		isError: result.isError,
		addAnecdotes: (content) => addAnecdotesMutation.mutate({ content, votes: 0 }),
		addVote: (updatedAnecdote) => addVoteMutation.mutate(updatedAnecdote)
	}
}
