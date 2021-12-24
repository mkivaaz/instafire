import React from 'react'

function Profile_unwrap({label, info}) {


    return (
        <div style={{padding: "5px"}}>
            <label className='profile-label'>{label}: 
            <h2 className='profile-info'>{info}</h2></label>
        </div>
    )
}

export default Profile_unwrap
