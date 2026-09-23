import { describe, expect, beforeEach, vi, test, afterEach } from 'vitest'
import AnecdoteList from './AnecdoteList'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import { useAnecdoteStore } from '../store'
import anecdotesServices from '../services/anecdotes'
import userEvent from '@testing-library/user-event'
import Filter from './Filter'

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
afterEach(() => {
	cleanup()
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
	test('list is filtered', async () => {
		const mockAnecdotes = [
			{ id: '1', content: 'cwj sort abc', votes: 0 },
			{ id: '2', content: 'cwj sort abd', votes: 2 },
			{ id: '3', content: 'cwj sort bde', votes: 1 },
		]
		anecdotesServices.getAll.mockResolvedValue(mockAnecdotes)
		render(
			<div>
				<Filter />
				<AnecdoteList />
			</div>
		)
		await screen.findByText('cwj sort abd')
		const user = userEvent.setup()
		const input = screen.getByTestId('filter')
		await user.type(input, 'ab')
		await waitFor(() => {
			expect(screen.queryByText('cwj sort bde')).toBeNull()
		})
		expect(screen.getByText('cwj sort abc')).toBeDefined()
		expect(screen.getByText('cwj sort abd')).toBeDefined()
	})
})
