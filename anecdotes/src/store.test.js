import { describe, expect, beforeEach, vi, test } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
	default: {
		getAll: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		remove: vi.fn(),
	}
}))

import anecdotesServices from './services/anecdotes'
import { useAnecdotesControls, useAnecdoteStore } from './store'
beforeEach(() => {
	useAnecdoteStore.setState({
		anecdotes: [],
		filter: '',
	})
	vi.clearAllMocks()
})
describe('test store', () => {
	test('init data from backend', async () => {
		const mockAnecdotes = [
			{ id: '1', content: 'If it', votes: 0 },
			{ id: '2', content: 'Else', votes: 1 },
		]
		anecdotesServices.getAll.mockResolvedValue(mockAnecdotes)
		const { result } = renderHook(() => useAnecdotesControls())
		await act(async () => {
			await result.current.initAnecdotes()
		})
		const { result: anecdotesRet } = renderHook(() => useAnecdoteStore())
		expect(anecdotesRet.current.anecdotes).toEqual(mockAnecdotes)
	})
})
