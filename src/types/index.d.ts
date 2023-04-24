import { ListedForType } from "./index.type";

export type NotificationType = "ERROR" | "WARNING" | "SUCCESS";

export type NotificationMessageType = {
    title?: string,
    code?: string
    actionNeeded?: boolean
    message?: string
    notificationType?: NotificationType
    Children?: ReactElement | ReactElement[]
    positiveAction?: () => void
    negativeAction?: () => void
    positiveActionText?: string
    negativeActionText?: string
}

export type ScreenType = "MOBILE" | "TABLET" | "DESKTOP" | "EXTRA_LARGE_DESKTOP" | "TV_SCREEN";
export type PendingDataListingType = "HOME" | "LAND" | "STAY" | "CARS";

export type PendingDataType = {
    pendingListingType?: PendingDataListingType,
    uid?: string,
    // ListedForType?: ListedForType
}