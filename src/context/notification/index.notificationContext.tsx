import { Component } from "react";
import TransitionsModal from "../../components/modal";
import { NotificationMessageType } from "../../types";
import { NotificationContext } from "./context";
import { NotificationContextProp, NotificationContextState } from "./types";

class NotificationContextProvider extends Component<NotificationContextProp, NotificationContextState>{

    constructor(props: NotificationContextProp) {
        super(props);
        this.state = {
            actionNeeded: false
        }
    }
    componentDidMount() {

    }
    clearNotification = () => {
        this.setState((_: NotificationContextState) => ({
            Children: undefined, code: undefined, message: undefined, negativeAction: undefined,
            negativeActionText: undefined, notificationType: undefined, positiveAction: undefined,
            positiveActionText: undefined, title: undefined,
            actionNeeded: false,
        }))
    }

    isNotificationAvailable = () => {
        return this.state.code !== undefined || this.state.message !== undefined || this.state.Children !== undefined || this.state.title !== undefined
    }

    addNotification = ({ Children, code, message, negativeAction, negativeActionText, notificationType, positiveAction,
        positiveActionText, title, actionNeeded }: NotificationMessageType) => {

        this.setState((_: NotificationContextState) => ({
            Children, code, message, negativeAction,
            negativeActionText, notificationType, positiveAction,
            positiveActionText, title,
            actionNeeded
        }))
    }
    positiveAction = () => {
        this.state.negativeAction?.();
    }
    negativeAction = () => {
        this.state.positiveAction?.();
    }
    setPositiveAction = (action: () => void) => {

        this.setState((prev: NotificationContextState) => ({ ...prev, positiveAction: action }))
    }
    setNegativeAction = (action: () => void) => {
        this.setState((prev: NotificationContextState) => ({ ...prev, negativeAction: action }))
    }

    render() {
        return (<NotificationContext.Provider value={{
            clearNotification: this.clearNotification,
            addNotification: this.addNotification,
            positiveAction: this.positiveAction,
            negativeAction: this.negativeAction,
            setPositiveAction: this.setPositiveAction,
            setNegativeAction: this.setNegativeAction,

        }}>
            {this.props.children}
            <TransitionsModal openDialog={this.isNotificationAvailable()} {...this.state} resetNotificationState={this.clearNotification} />
        </NotificationContext.Provider>)
    }
}
const NotificationContextConsumer = NotificationContext.Consumer;

export { NotificationContextProvider, NotificationContextConsumer };
