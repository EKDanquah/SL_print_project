import React from "react";
import { NotificationMessageType } from "../../types";
 import { NotificationContextType } from "./types";

export const NotificationContext = React.createContext<NotificationContextType>({
    clearNotification: () => {},
    addNotification: (_: NotificationMessageType) => {},
    positiveAction: () => {},
    negativeAction: () => {},
    setPositiveAction: (_: () => void) => {},
    setNegativeAction: (_: () => void) => {},
});