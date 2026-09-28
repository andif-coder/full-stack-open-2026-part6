import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, addAnecdotesToService } from '../request'

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
	return {
		anecdotes: result.data,
		isPending: result.isPending,
		isError: result.isError,
		addAnecdotes: (content) => addAnecdotesMutation.mutate({ content, votes: 0 })
	}
}
