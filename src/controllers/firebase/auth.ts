// https://firebase.google.com/docs/auth/web/facebook-login
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, EmailAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, GoogleAuthProvider, linkWithCredential, linkWithPopup, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth";
import * as History from "history";
import { NavigateFunction } from "react-router-dom";
import { AuthContextType } from "../../context/auth/types";
import { NotificationContextType } from "../../context/notification/types";
import { AuthUserType, FirebaseLocalUserType } from "../../types/auth.type";
import { auth } from "./index";

const LOCAL_USER_ID = "firebase_user";

export async function loginWithGoogle(authContext?: AuthContextType, notificationContext?: NotificationContextType, navigate?: NavigateFunction, linking: boolean = false) {

    const googleAuthProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            const user = result.user;
            saveUserToLocalStorage(user);



            authContext?.loadUserToState(user)
            if (!linking) {
                navigate?.("/")
            }
        }).catch((error) => {
            const email = error.customData?.email;
            const errorCode = error.code;
            notificationContext?.addNotification({
                message: errorFirebase(error, email),
                title: "Login Error",
                notificationType: "WARNING",
                positiveActionText: "ok",
                negativeActionText: "cancel",
                code: errorCode,
                positiveAction: () => {
                    // resolveAccountExistsWithDifferentCredential(email as string);
                }
            })
            // Handle Errors here.

            // The email of the user's account used.

            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);  
        });
}

export async function loginWithFacebook(authContext?: AuthContextType, notificationContext?: NotificationContextType, navigate?: NavigateFunction, linking: boolean = false) {

    const facebookAuthProvider = new FacebookAuthProvider();
    await signInWithPopup(auth, facebookAuthProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            saveUserToLocalStorage(user);
            authContext?.loadUserToState(user)

            if (!linking) {
                navigate?.("/")
            }
        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = FacebookAuthProvider.credentialFromError(error);
            // resolveAccountExistsWithDifferentCredential(error, email);

            const email = error.customData?.email;
            const errorCode = error.code;
            const duplicateAccount = errorCode === "auth/account-exists-with-different-credential";
            notificationContext?.addNotification({
                message: errorFirebase(error, email)
                ,
                title: "Login Error",
                notificationType: "WARNING",
                positiveActionText: duplicateAccount ? "Link" : "ok",
                negativeActionText: duplicateAccount ? "cancel" : undefined,
                code: errorCode,
                positiveAction: () => {
                    if (duplicateAccount) {
                        duplicateAccountLinking(email, "FACEBOOK", navigate);
                    }
                }
            })
        });
}
/**
 * 
 * @param { email, password, authContext} 
 */
export async function loginWithEmailAndPassword({ email, password, authContext, navigate, notificationContext, linking = false }: AuthUserType & { authContext?: AuthContextType, navigate?: NavigateFunction, notificationContext?: NotificationContextType, linking?: boolean }) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            saveUserToLocalStorage(user);
            authContext?.loadUserToState(user)
            if (!linking) {
                navigate?.("/")
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const userNotFound = error.code === 'auth/user-not-found';
            let positiveMessage = "Ok";
            if (userNotFound) {
                positiveMessage = "Sign up"
            }

            notificationContext?.addNotification({
                message: errorFirebase(error, email),
                title: "Login Error",
                notificationType: "WARNING",
                positiveActionText: positiveMessage,
                negativeActionText: userNotFound ? "Cancel" : undefined,
                code: errorCode,
                positiveAction: () => {
                    if (userNotFound) {
                        navigate?.("/register");
                    }
                }
            })
        });

}

export async function createNewUserWithEmailAndPassword({ email, password, authContext, navigate, notificationContext }: { email: string, password: string, authContext?: AuthContextType, navigate?: NavigateFunction, notificationContext?: NotificationContextType, }) {

    await createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // const credential = FacebookAuthProvider.credentialFromResult(result);
            // const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            saveUserToLocalStorage(user);
            authContext?.loadUserToState(user)
            // ...
        }).catch((error) => {
            // resolveAccountExistsWithDifferentCredential(error, email);
            // const email = error.customData?.email;
            const errorCode = error.code;
            const duplicateAccount = errorCode === "auth/account-exists-with-different-credential";
            const emailInUse = errorCode === "auth/email-already-in-use";

            let positiveMessage = "Ok";
            if (emailInUse) {
                positiveMessage = "Login"
            }

            notificationContext?.addNotification({
                message: errorFirebase(error, email),
                title: "Login Error",
                notificationType: "WARNING",
                positiveActionText: positiveMessage,
                negativeActionText: duplicateAccount || emailInUse ? "cancel" : undefined,
                code: errorCode,
                positiveAction: () => {
                    if (duplicateAccount) {
                        duplicateAccountLinking(email, "EMAIL_PASSWORD", navigate);
                    } else if (emailInUse) {
                        navigate?.("/login");
                    }
                }
            })
        });
}

/**
 * This is used to send verification email for  email and password signup only
 */
export async function sendVerificationEmail() {
    await sendEmailVerification(auth.currentUser as User)
        .then(() => {
            alert("Verification  mail sent")
        });
}

/**
 * This method is used to send reset password for email and password login only
 */
export function resetUsersPassword({ email, authContext, notificationContext }: { email: string, authContext?: AuthContextType, notificationContext?: NotificationContextType }) {

    sendPasswordResetEmail(auth, email)
        .then(() => {
            notificationContext?.addNotification({
                message: `Password Resent mail mail sent successfully to this email ${email}`,
                title: "Login Error",
                notificationType: "WARNING",
                positiveActionText: "Ok",
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            let message = errorMessage;
            let positiveMessage = "Ok";
            notificationContext?.addNotification({
                message,
                title: "Reset Password Error",
                notificationType: "ERROR",
                positiveActionText: positiveMessage,
                code: errorCode,
            })
        });
}

export function signOutCurrentUser(authContext?: AuthContextType) {

    signOut(auth).then(() => {
        removeUserToLocalStorage();
        authContext?.loadUserToState(undefined)
    }).catch((error) => {
        alert("fail to sign out")
    });
}
export function onAuthStateChange(loadUserToState?: (user?: User) => void, navigate?: NavigateFunction) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            saveUserToLocalStorage(user)
            loadUserToState?.(user)

        } else {

            removeUserToLocalStorage();
            loadUserToState?.(undefined)
            navigate?.("login")
        }
    });
}

function duplicateAccountLinking(email: string, provider: string, navigate?: NavigateFunction) {

    fetchSignInMethodsForEmail(auth, email)
        .then(function (providers) {
            if (providers.indexOf(GoogleAuthProvider.PROVIDER_ID) !== -1) {
                navigate?.("/link-account", { state: { email, provider, availableProvider: "GMAIL" } });
            } else if (providers.indexOf(FacebookAuthProvider.PROVIDER_ID) !== -1) {
                navigate?.("/link-account", { state: { email, provider, availableProvider: "FACEBOOK" } });
            } else if (providers.indexOf(EmailAuthProvider.PROVIDER_ID) !== -1) {
                navigate?.("/link-account", { state: { email, provider, availableProvider: "EMAIL_PASSWORD" } });
            }
        })
}

function removeUserToLocalStorage() {
    localStorage.removeItem(LOCAL_USER_ID)
}

function saveUserToLocalStorage(user?: User) {
    if (user) {
        localStorage.setItem(LOCAL_USER_ID, JSON.stringify(user.toJSON()))
    }
}

export function getUserFromLocalStorage(): FirebaseLocalUserType | undefined {
    let userString = localStorage.getItem(LOCAL_USER_ID) as string;
    if (userString?.length > 0) {
        let userJson = JSON.parse(userString);
        return userJson as FirebaseLocalUserType;
    }
    return undefined;
}

export function linkFaceBookAccount(authContext?: AuthContextType, notificationContext?: NotificationContextType, navigate?: NavigateFunction) {
    const provider = new FacebookAuthProvider();

    linkWithPopup(auth.currentUser as User, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        saveUserToLocalStorage(user);
        authContext?.loadUserToState(user);

        notificationContext?.addNotification({
            message: `This email's (${auth.currentUser?.email}) account has been successful linked with your facebook account`,
            title: "Link successful",
            notificationType: "SUCCESS",
            positiveActionText: "continue",
            positiveAction: () => {
                navigate?.("/")
            }
        })
    }).catch((error) => {

        const email = error.customData?.email;
        const errorCode = error.code;
        const duplicateAccount = errorCode === "auth/account-exists-with-different-credential";
        notificationContext?.addNotification({
            message: errorFirebase(error, email),
            title: "Linking Error",
            notificationType: "WARNING",
            positiveActionText: duplicateAccount ? "Link" : "ok",
            negativeActionText: duplicateAccount ? "cancel" : undefined,
            code: errorCode,
            positiveAction: () => {
                if (duplicateAccount) {
                    duplicateAccountLinking(email, "FACEBOOK", navigate);
                }
            }
        })
    });
}

export function linkGoogleAccount(authContext?: AuthContextType, notificationContext?: NotificationContextType, navigate?: NavigateFunction) {
    const provider = new GoogleAuthProvider();

    linkWithPopup(auth.currentUser as User, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = FacebookAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        saveUserToLocalStorage(user);
        authContext?.loadUserToState(user)
        // ...
    }).catch((error) => {

        const email = error.customData?.email;
        const errorCode = error.code;
        const duplicateAccount = errorCode === "auth/account-exists-with-different-credential";
        notificationContext?.addNotification({
            message: errorFirebase(error, email),
            title: "Linking Error",
            notificationType: "WARNING",
            positiveActionText: duplicateAccount ? "Link" : "ok",
            negativeActionText: duplicateAccount ? "cancel" : undefined,
            code: errorCode,
            positiveAction: () => {
                if (duplicateAccount) {
                    duplicateAccountLinking(email, "FACEBOOK", navigate);
                }
            }
        })
    });
}

export function linkEmailAndPasswordAccount(email: string, password: string, authContext?: AuthContextType, notificationContext?: NotificationContextType, navigate?: NavigateFunction) {
    const credential = EmailAuthProvider.credential(email, password);

    linkWithCredential(auth.currentUser as User, credential).then((result) => {
        const user = result.user;
        saveUserToLocalStorage(user);
        authContext?.loadUserToState(user)
    }).catch((error) => {
        const email = error.customData?.email;
        const errorCode = error.code;
        const duplicateAccount = errorCode === "auth/account-exists-with-different-credential";
        notificationContext?.addNotification({
            message: errorFirebase(error, email)
            // duplicateAccount ?
            //     : errorMessage
            ,
            title: "Login Error",
            notificationType: "WARNING",
            positiveActionText: duplicateAccount ? "Link" : "ok",
            negativeActionText: duplicateAccount ? "cancel" : undefined,
            code: errorCode,
            positiveAction: () => {
                if (duplicateAccount) {
                    duplicateAccountLinking(email, "FACEBOOK", navigate);
                }
            }
        })
    });
}

function errorFirebase(error: FirebaseError, email?: string) {
    // console.error(error)
    return error.code.replaceAll("auth/", "").replaceAll("-", " ");

}