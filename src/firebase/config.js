
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA83O0UoSrOUxKvnTRYosB4ENz-zchetDQ",
  authDomain: "mkivaaz-instafire.firebaseapp.com",
  projectId: "mkivaaz-instafire",
  storageBucket: "mkivaaz-instafire.appspot.com",
  messagingSenderId: "399894339681",
  appId: "1:399894339681:web:6215e6d19c7c586ffdca20"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const projectStorage = getStorage(firebaseApp);
const projectFirestore = getFirestore();


export {projectFirestore, projectStorage}