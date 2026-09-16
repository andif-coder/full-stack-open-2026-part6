import { useAnecdotesControls } from "../store"
const Filter = () => {
	const changeFilter = useAnecdotesControls().changeFilter
  const handleChange = (event) => {
		const value = event.target.value
		changeFilter(value)
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter
