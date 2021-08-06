import React from 'react';

const UserPhoto = (props) => {
    return (
        <img className="profile-pic" src={props.src} alt={props.name} />
    )
}

export default UserPhoto;