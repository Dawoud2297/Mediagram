import React from 'react'
import { Link } from 'react-router-dom'
import useGetImage from '../../hooks/useGetImage'

const UserCard = ({ user }) => {
    const userImgUrl = useGetImage(user?.imageId || "");
    console.log(user)
    return (
        <Link to={`/profile/${user.$id}`} className='user-card'>
            <img
                src={userImgUrl ? userImgUrl :
                    (user?.imageUrl ? user.imageUrl : "assets/icons/profile-placeholder.svg")
                }
                alt='creator'
                className='rounded-full w-14 h-14'
            />
            <div className='flex-center flex-col gap-1'>
                <p className='base-medium text-light-1 text-center'>
                    {user.name}
                </p>
                <p className='small-regular text-light-3 text-center'>
                    @{user.username}
                </p>
            </div>
            <button type='button' className='btn-submit'>Follow</button>
        </Link>
    )
}

export default UserCard