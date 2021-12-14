import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useState } from 'react'
import { projectFirestore, projectStorage } from '../firebase/config';

function useStorage(file) {
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
                addDoc(collection(projectFirestore,"images"),{url: {downloadURL}, createdAt: {timestamp}});
                
                // const urlRef = doc(projectFirestore, 'images',{url: downloadURL, timestamp: serverTimestamp()});
                // addDoc(urlRef)
            })
            
        })
    },[file])

    return {progress, error, url}
}

export default useStorage
