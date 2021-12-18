import React, { useState } from 'react'
import ProgressBar from './ProgressBar'

function UploadForm() {

    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const fileTypes = ['image/png', 'image/jpeg']

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        
        if(selected && fileTypes.includes(selected.type) ){
            setFile(selected)
            setError(null)

        }else{
            setError("Please upload an image file (png or jpeg)")
            setFile(null)
        }
    }

    return (
        <form>
            <label className='upload-btn'>
                <input type="file" onChange={changeHandler}/>
                <span>+</span>
            </label>
            <div className='output'>
                {error && <div className='error'>{error}</div>}
                {file && <div className='file'>{file.name}</div>}
                {file && <ProgressBar file = {file} setFile = {setFile}/>}
            </div>
            
        </form>
    )
}

export default UploadForm
