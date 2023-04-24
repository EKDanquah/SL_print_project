import { User } from "firebase/auth"

export type AuthUserType = {
    email: string,
    password: string
}

type ProviderDataType = [{
    providerId: string,
    uid: string,
    displayName: string,
    email: string,
    phoneNumber: string | null,
    photoURL: string
}]

type StsTokenManagerType = {
    refreshToken: string,
    accessToken: string,
    expirationTime: number,
}

export type FirebaseLocalUserType = {
    uid: string,
    email: string,
    emailVerified: boolean,
    displayName: string,
    isAnonymous: boolean,
    photoURL: string,
    providerData: ProviderDataType,
    stsTokenManager: StsTokenManagerType,
    createdAt: string,
    lastLoginAt: string,
    apiKey: string,
    appName: string
}
export type AuthProviderType = "EMAIL_PASSWORD" | "FACEBOOK" | "GMAIL"
export type AuthRouterStateType = { email: string, provider: AuthProviderType, availableProvider: AuthProviderType }

export type FirebaseUserType = User