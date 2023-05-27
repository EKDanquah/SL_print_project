import { FirebaseApp } from 'firebase/app';
import {
    Auth,
    UserCredential,
    connectAuthEmulator,
    createUserWithEmailAndPassword,
    User as fbUser,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { IS_APP_LOCAL } from '../utils/constants';
import { PrintDB } from './printDB';

export class PrintAuth extends PrintDB {
    app?: FirebaseApp;
    auth?: Auth;
    static _isEmulatorEnabled = false;

    constructor(app: FirebaseApp) {
        super(app);
        this.app = app;

        this.auth = IS_APP_LOCAL ? getAuth() : getAuth(app);

        if (IS_APP_LOCAL && !PrintAuth._isEmulatorEnabled) {
            connectAuthEmulator(this.auth, 'http://localhost:9099', { disableWarnings: true });
            PrintAuth._isEmulatorEnabled = true;
        }
        
        // this.user = new User(app);
    }

    /**
     *
     * @param email
     * @param password
     * @returns this returns a firebase user or null if the app is not initialized
     */
    async emailPasswordSignup(email: string, password: string): Promise<UserCredential | null> {
        if (this?.auth) {
            await createUserWithEmailAndPassword(this.auth, email, password).then(async (userCredential) => {
                console.log(JSON.stringify(userCredential));
                // Signed in
                const user: UserCredential = userCredential;

                // await sendEmailVerification(user);

                return user;
            });
        }
        return null;
    }

    async logout(): Promise<boolean> {
        if (this.auth) {
            return await signOut(this.auth)
                .then(() => true)
                .catch(() => false);
        }
        return false;
    }

    /**
     *
     * @param email
     * @param password
     * @returns this returns a firebase user or null if the app is not initialized
     */
    async emailPasswordLogin(email: string, password: string): Promise<fbUser | null> {
        if (this?.auth) {
            signInWithEmailAndPassword(this?.auth, email, password)
                .then(async (userCredential) => {
                    return userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // do analysis
                });
        } else {
            throw 'auth not initialized';
        }
        return null;
    }

    /**
     *
     * @param user
     * used to send verification email to a the app user
     */
    async sendVerificaitonMail(user: fbUser) {
        await sendEmailVerification(user);
    }

    /**
     *
     * @param onComplete
     * used to listen to current users colletion and check wether they are verified or not
     */
    onVerificationComplete(onComplete: (data: DocumentSnapshot<DocumentData>) => void) {
        if (this.app && this?.auth && this.auth.currentUser) {
            this.onDocVlaueChange((doc) => {
                if (doc.exists()) {
                    var data = doc.data();
                    if (data['isVerified'] === true) onComplete(doc);
                }
            }, 'Users');
        } else {
            throw 'invalid initialization of apps';
        }
    }

    
  
}
