import { Timestamp } from "firebase/firestore/lite"

export type entityType = {
    created_at: Timestamp
    deleted_at?: Timestamp,
    id?: string,
}

export type LocationType = {
    region: RegionType,
    town: string,
    street: string,
    streetNO: number
}
export type AgentType = {
    email: string,
    name: string,
    phoneNumber: string,
    location: LocationType,
    sex: string
} & entityType

export type CustomerType = {
    email: string,
    name: string,
    phoneNumber: string,
    location: LocationType,
    activePrintJobsToken: string[]
    usePrintJobsTokenCount: number,
    sex: string
} & entityType

export type PrintJobsTokenType = {
    statue: PrintJobsStatusType
    assignedTo: string
} & entityType

export type PrintJobsType = {
    raffles: PrintJobsItemType[],
    endDate?: string,
    startDate: string,
    rafflePromoName: string,
    minimumEligiblePrintJobsCount: number,
} & entityType;

export type PrintJobsItemType = {
    imageUrl: string,
    name: string,
    details?: string,

} & entityType;

export type PrintJobsStatusType = "active" | "inactive" | "used";

export type FeedbackType = {
    issue: string
    title: string
    attached: any
    attachedType: FeedbackAttachedType
} & entityType

export type RegionType = "Eastern Province" |
    "Northern Province" |
    "Southern Province" |
    "North West Province"



export type ConsumerInsightType = "ISSUE" | "OPINION";

export type SexType = "MALE" | "FEMALE";

export type FeedbackAttachedType = "image" | "print-jobs";