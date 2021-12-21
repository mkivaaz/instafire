import { motion } from 'framer-motion';
import React from 'react'

function Alert({message, setMessage}) {

    const handleClick = (e) => {
        if(e.target.classList.contains('backdrop')){
            setMessage(null);
        }
    } 

    return (
        <motion.div className='backdrop alert' onClick={handleClick}
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
        >
            <motion.div className='alert-msg'
                initial = {{x : "100vh"}}
                animate = {{x : 0}}
            >
                <h1>{message}</h1>
                
                </motion.div>
        </motion.div>
    )
}

export default Alert
