import { User } from "firebase/auth";
import React from "react";
import { FirebaseLocalUserType } from "../../types/auth.type";
import { AuthContextType } from "./types";

export const AuthContext = React.createContext<AuthContextType>({
    loadUserToState: (_?: User | FirebaseLocalUserType) => {},
    authError: undefined,
    setAuthErrorToState: (authError: string) => {},
    user: undefined,
    isUserLoggedIn: () => false,
    role:"USER"
    // "ADMIN"
});