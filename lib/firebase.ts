import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
/**
 * Initialize Firebase application instance.
 * Ensures that the app is initialized only once (singleton pattern).
 * Relies on environment variables for configuration.
 */
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
export const auth = getAuth(app);

// Initialize Firestore with settings
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

export const db = initializeFirestore(app, {
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});

try {
    // Check for missing config
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        console.error("Firebase Config Missing:", {
            apiKey: !!firebaseConfig.apiKey,
            projectId: !!firebaseConfig.projectId,
            authDomain: !!firebaseConfig.authDomain
        });
    } else {
        console.log("Firebase Configured for Project:", firebaseConfig.projectId);
    }
} catch (e) {
    console.error("Error checking firebase config", e);
}

export default app;
