import { describe, expect, beforeEach, vi, test } from 'vitest'
import AnecdoteList from './AnecdoteList'
import { render, screen } from '@testing-library/react'
import { useAnecdoteStore } from '../store'
import anecdotesServices from '../services/anecdotes'

vi.mock('../services/anecdotes', () => ({
	default: {
		getAll: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		remove: vi.fn(),
	}
}))
beforeEach(() => {
	useAnecdoteStore.setState({
		anecdotes: [],
		filter: '',
	})
	vi.clearAllMocks()
})
describe('test list', () => {
	test('list is sorted', async () => {
		const mockAnecdotes = [
			{ id: '1', content: 'cwj sort xxx', votes: 0 },
			{ id: '2', content: 'cwj sort yyy', votes: 2 },
			{ id: '3', content: 'cwj sort zzz', votes: 1 },
		]
		anecdotesServices.getAll.mockResolvedValue(mockAnecdotes)
		render(<AnecdoteList />)
		await screen.findByText('cwj sort xxx')
		const items = screen.getAllByText(/cwj sort/)
		// console.log('cwj items: ', items)
		const contents = items.map(i => i.textContent)
		expect(contents).toEqual([
			'cwj sort yyy',
			'cwj sort zzz',
			'cwj sort xxx',
		])
	})
})
