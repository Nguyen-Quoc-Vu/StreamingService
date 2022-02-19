import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "long-random-key",
  authDomain: "default-domain-of-your-app",
  projectId: "name-project -id",
  storageBucket: "storage-bucket",
  messagingSenderId: "messageSenderId",
  appId: "random-key",
  measurementId: "random-key",
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db };
