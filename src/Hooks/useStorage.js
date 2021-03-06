import { getAuth } from 'firebase/auth';
import { addDoc, serverTimestamp, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react'
import { projectFirestore, projectStorage } from '../firebase/config';


function useStorage(file) {
    const userEmail = getAuth().currentUser.email;
    const [progress, setProgress] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef =  ref(projectStorage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file)

        

       uploadTask.on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (e) =>{
            setError(error)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setUrl(downloadURL);
                const timestamp = serverTimestamp();
                const storeRef = collection(projectFirestore, "images",userEmail,"files")
                addDoc(storeRef,{url: {downloadURL}, createdAt: {timestamp}});
                
            })
            
        })
    },[file])

    return {progress, error, url}
}

function storeUser(user){

    const docRef = doc(projectFirestore, "users", user.email)
    setDoc(docRef,{user});
    console.log(docRef);
    
}

export {useStorage, storeUser}
