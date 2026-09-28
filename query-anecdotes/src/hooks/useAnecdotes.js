import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addAnecdotesToService, addVote } from '../request'

export const useAnecdotes = () => {
	const queryClient = useQueryClient()
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
	})
	const addAnecdotesMutation = useMutation({
		mutationFn: addAnecdotesToService,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
		},
	})
	const addVoteMutation = useMutation({
		mutationFn: addVote,
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes'])
			queryClient.setQueryData(['anecdotes'], anecdotes.map(a => updatedAnecdote.id === a.id ? updatedAnecdote : a))
		}
	})
	return {
		anecdotes: result.data,
		isPending: result.isPending,
		isError: result.isError,
		addAnecdotes: (content) => addAnecdotesMutation.mutate({ content, votes: 0 }),
		addVote: (updatedAnecdote) => addVoteMutation.mutate(updatedAnecdote)
	}
}
