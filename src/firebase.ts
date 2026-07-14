import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYT-jAJgRMj-SqTVmOypA7A-Hyyzkj2bo",
  authDomain: "com-example-npxc-bdabb.firebaseapp.com",
  projectId: "com-example-npxc-bdabb",
  storageBucket: "com-example-npxc-bdabb.firebasestorage.app",
  messagingSenderId: "998723294226",
  appId: "1:998723294226:web:1fe015df667bf3b17934cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
