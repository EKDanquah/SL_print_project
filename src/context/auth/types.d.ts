import { User } from "firebase/auth"
import { ReactElement } from "react"
import { FirebaseLocalUserType } from "../../types/auth.type"

export type AuthContextProp = {
    children: ReactElement | ReactElement[]
}

export type AuthContextState = {
    user?: User | FirebaseLocalUserType
    authError?: string
}

export type AuthContextType = {
    loadUserToState: (user?: User | FirebaseLocalUserType) => void,
    authError?: string,
    setAuthErrorToState: (authError: string) => void,
    user?: User | FirebaseLocalUserType,
    isUserLoggedIn: () => boolean
    role: string
}
