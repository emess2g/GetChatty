// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getFirestore, setDoc} from 'firebase/firestore'
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
const db = getFirestore(app)

const signup = async (username,email,password) => {
    try {
         const res = await createUserWithEmailAndPassword(auth, email, password) // create user data
         const user = res.user;
         await setDoc(doc(db,'users',user.uid), {
            // stores user data 
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"hey, there i am using get chatty app",
            lastSeen: Date.now()
         })
         await setDoc(doc(db,'chats', user.uid),{
            chatsData:[]
         })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        conaole.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
    try {
       await signOut(auth)
    } catch (error) {
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
}

export {signup,login,logout,auth,db};