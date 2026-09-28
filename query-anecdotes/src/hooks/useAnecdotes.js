import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../request'

export const useAnecdotes = () => {
	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
	})
	return {
		anecdotes: result.data,
		isPending: result.isPending,
		isError: result.isError,
	}
}
