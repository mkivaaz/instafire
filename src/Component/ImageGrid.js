import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import useFirestore from '../Hooks/useFirestore';
import {motion} from 'framer-motion'

function ImageGrid({setSelectedImg}) {
    
    const  docs = useFirestore();
    
    
    // console.log(docs);
    return (        
        <div className='img-grid'>
            {docs && docs.map(element =>(
                
                <motion.div className='img-wrap' key={element.id} 
                    layout
                    whileHover={{opacity: 1}}
                    onClick={() => setSelectedImg(element.url.downloadURL)}>

                        <motion.img src = {element.url.downloadURL} alt='broken image' 
                            initial={{opacity:0}}
                            animate = {{opacity:1}}
                            transition={{delay:1}}
                        />

                </motion.div>
    ))}
        </div>
    )
}

export default ImageGrid
