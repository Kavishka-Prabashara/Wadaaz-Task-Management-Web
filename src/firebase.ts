import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY, // පරිසර විචල්‍යය භාවිතා කරන්න
    authDomain: "wadaaz-task-management.firebaseapp.com",
    projectId: "wadaaz-task-management",
    storageBucket: "wadaaz-task-management.appspot.com",
    messagingSenderId: "745104262527",
    appId: "1:745104262527:web:63d539c0bd628a94d6064a",
    measurementId: "G-JQ6N685RBH",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();
        logEvent(analytics, 'google_sign_in');
        return token;
    } catch (error) {
        console.error("Google Sign-in Error:", error);
        throw error;
    }
};

export { auth, provider };
