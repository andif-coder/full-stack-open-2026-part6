import useNotification from "../hooks/useNotification"
const Notification = () => {
	const { msg } = useNotification()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
		<div> 
		{ msg ? <div data-testid="notification" style={style}>{msg}</div> : <></> }
		</div>
	)
}

export default Notification
