import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';


const firebaseConfig = {
  apiKey: "AIzaSyA9C7ZB2bOIBGu1X7Vkpibz2Wm3DlmWeYQ",
  authDomain: "bookapplab03.firebaseapp.com",
  projectId: "bookapplab03",
  storageBucket: "bookapplab03.firebasestorage.app",
  messagingSenderId: "515407363844",
  appId: "1:515407363844:web:9d68165ae0de31fcd99a51",
  measurementId: "G-MQZ6V4JY3X"
};


const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db, analytics };
