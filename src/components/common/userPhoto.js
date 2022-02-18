import React from 'react';

const UserPhoto = (props) => {
    return (
        <img className="profile-pic" src={'/uploads/photos/' + (props.primaryPhoto ? props.primaryPhoto : 'not-set.png')} alt={props.name} />
    )
}

export default UserPhoto;