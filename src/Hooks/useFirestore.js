import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config';

function useFirestore() {
    const [docs, setDocs] = useState([]);
    const auth = getAuth();
    
    
    useEffect(() => {
        onAuthStateChanged(auth, user => {
        if(user){
            const q = query(collection(projectFirestore, "images/"+user.email+"/files"),orderBy("createdAt", "desc"));

        const unsub = 
        onSnapshot(q, (snap) =>{
            let documents = [];
            
            snap.forEach(document => {
                documents.push({
                    ...document.data(), 
                    id: document.id,
                });

            });
            setDocs(documents)
        });

        return () => unsub();
        }
    })
        
    }, [collection])


    return  docs 
}

export default useFirestore
