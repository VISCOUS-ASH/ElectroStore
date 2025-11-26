import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA7K9WKMQpmWm_-lVfZV0n-QAtP6mqdklw",
  authDomain: "electrostore-21cdf.firebaseapp.com",
  projectId: "electrostore-21cdf",
  storageBucket: "electrostore-21cdf.firebasestorage.app",
  messagingSenderId: "76924747166",
  appId: "1:76924747166:web:5f08b44cc802e9e450aa8f",
  measurementId: "G-9PW9T1YGGY"
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);