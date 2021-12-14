import React, { useEffect } from 'react'
import useStorage from '../Hooks/useStorage'

function ProgressBar({file, setFile}) {
    const {url, progress} = useStorage(file);
    // console.log(progress + " " + url);

    useEffect(() =>{
        if(url){
            setFile(null);
        }
    }, [url])

    return (
        <div className='progress-bar' style={{width: progress + '%'}}>
            
        </div>
    )
}

export default ProgressBar
