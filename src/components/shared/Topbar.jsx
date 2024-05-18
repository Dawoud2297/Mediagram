import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
import { signOutAccount } from '../../lib/appwrite/api'
import useGetImage from '../../hooks/useGetImage';

const Topbar = () => {
    const { user } = useUserContext();
    const imgUrl = useGetImage(user?.imageId);
    const navigate = useNavigate();


    const signOutUser = () => {
        signOutAccount();
        navigate("/log-in")
    }


    return (
        <section className='top-bar'>
            <div className='flex-between px-5'>
                <Link to="/" className='flex-start'>
                    <img
                        src='/assets/images/m2.svg'
                        alt='logo'
                        className='top-bar_logo'
                    />
                </Link>
                <div className='flex gap-4'>
                    <button className='btn' onClick={() => signOutUser()}>
                        <img src="/assets/icons/logout.svg" alt='logout' />
                    </button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img
                            src={
                                imgUrl ? imgUrl : (user.imageUrl ? user.imageUrl : '/assets/icons/profile-placeholder.svg')
                            }
                            alt='profile'
                            className=' h-10 w-10 ml-5 rounded-full'
                        />
                    </Link>
                </div>
            </div >
        </section>
    )
}

export default Topbar
