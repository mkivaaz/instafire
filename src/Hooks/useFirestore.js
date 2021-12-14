import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config';

function useFirestore(dir) {
    const [docs, setDocs] = useState([]);
    
    useEffect(() => {
        const q = query(collection(projectFirestore, dir),orderBy("createdAt", "desc"));

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
    }, [collection])


    return  docs 
}

export default useFirestore
