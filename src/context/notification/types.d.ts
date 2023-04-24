import { ReactElement } from "react"
import { NotificationMessageType } from "types"

export type NotificationContextProp = {
    children: ReactElement | ReactElement[],

}



export type NotificationContextState = NotificationMessageType

export type NotificationContextType = {
    clearNotification: () => void,
    addNotification: (_: NotificationMessageType) => void
    positiveAction: () => void
    negativeAction: () => void
    setPositiveAction: (action: () => void) => void
    setNegativeAction: (action: () => void) => void

}
