import { getAuth } from 'firebase/auth';
import React from 'react'
import useFirestore from '../Hooks/useFirestore'

function ImageGrid({setSelectedImg}) {
    const auth = getAuth();
    const email = auth.currentUser.email;
    const  docs = useFirestore("images/"+email+"/files");

    
    // console.log(docs);
    return (
        <div className='img-grid'>
            
            {docs && docs.map(element =>(
                
                <div className='img-wrap' key={element.id} onClick={() => setSelectedImg(element.url.downloadURL)}>
                    <img src = {element.url.downloadURL} alt='broken image' />
                </div>
    ))}
        </div>
    )
}

export default ImageGrid
