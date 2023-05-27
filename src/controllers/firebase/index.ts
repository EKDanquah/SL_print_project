import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyDtObfxRd4fXLEYVNtUStyAQmmnUpZIL2Q',
    authDomain: 'sl-printing.firebaseapp.com',
    projectId: 'sl-printing',
    storageBucket: 'sl-printing.appspot.com',
    messagingSenderId: '833950288238',
    appId: '1:833950288238:web:dff8d5b87dc3703935997f',
    measurementId: 'G-F4QBRQ75HQ'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
// const db = getFirestore(app);
const storage = getStorage(app);

// if (IS_APP_LOCAL) {
    // connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, "localhost", 9199);
    connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
// }

export { app, auth, storage };

