import { createContext, useState } from "react"
export const NotificationContext = createContext()
export const NotificationContextProvider = (props) => {
	const [msg, setMsg] = useState('')
	const showMsg = (content) => {
		setMsg(content)
		setTimeout(() => {
			setMsg('')
		}, 5000)
	}
	return (
		<NotificationContext.Provider value={{msg, showMsg}}>
			{props.children}
		</NotificationContext.Provider>
	)
}
