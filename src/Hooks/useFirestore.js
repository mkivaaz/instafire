import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config';

const auth = getAuth();

function useFirestore() {
    const [docs, setDocs] = useState([]);
    
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

function useProfile(){
    const [profile, setProfile] = useState({});

    useEffect( () =>{
        onAuthStateChanged(auth, async user => {
            if(user){
                const docRef = doc(projectFirestore, "users", user.email);
                
                const docSnap = await getDoc(docRef);
                console.log("data:",docSnap)
                if(docSnap)
                    setProfile(docSnap.data().user);
            }
        })
    },[collection])

    console.log("Profile:", profile)
    return profile;

}

export {useFirestore, useProfile}
