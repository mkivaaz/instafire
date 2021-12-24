import React from 'react'
import Profile_unwrap from '../Component/Profile_unwrap';
import { useProfile } from '../Hooks/useFirestore'

function Profile() {

    const profile = useProfile();
    console.log(profile)
    return (
        <div className='profile-container'>
        
            <Profile_unwrap label = {"First Name" }info = {profile.firstName}/>
            <Profile_unwrap label = {"Last Name" }info = {profile.lastName}/>
            <Profile_unwrap label = {"Email" }info = {profile.email}/>
        </div>
    )
}

export default Profile
