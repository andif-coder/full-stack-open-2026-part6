import { useNotificationMsg } from "../store"
const Notification = () => {
	const msg = useNotificationMsg()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
		<div>
			{ msg ? <div style={style} data-testid="notification">{msg}</div> : <></> }
		</div>
  )
}

export default Notification
