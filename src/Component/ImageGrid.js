import React from 'react'
import useFirestore from '../Hooks/useFirestore'

function ImageGrid({setSelectedImg}) {
    const  docs = useFirestore("images");

    
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
