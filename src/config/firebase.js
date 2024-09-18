// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { doc, getFireStore, setDoc} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA0aSmSTOzMdSGrXrb7VnyWDS5AjISuRH4",
  authDomain: "getchatty-4187d.firebaseapp.com",
  projectId: "getchatty-4187d",
  storageBucket: "getchatty-4187d.appspot.com",
  messagingSenderId: "80897855384",
  appId: "1:80897855384:web:9745358ba327ec3ca8e5ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFireStore(app);

const signup = async (username,email,password) => {
    try {
         const res = await createUserWithEmailAndPassword(auth, email, password)
         const user = res.user;
         await setDoc(doc(db,'users',user.uid), {
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"hey, there i am using get chatty app",
            lastSeen: Date.now()
         })
         await setDoc(doc(db,'chats', user.uid),{
            chatData:[]
         })
    } catch (error) {
        console.error(error);
        toast.error(error.code)
    }
}

export {signup};