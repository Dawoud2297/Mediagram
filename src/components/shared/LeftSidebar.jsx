import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
import { sidebarLinks } from '../../constants'
import Loader from './Loader'
import { signOutAccount } from '../../lib/appwrite/api'
import SidebarTooltip from '../ui/SidebarTooltip'
import useGetImage from '../../hooks/useGetImage'

const LeftSidebar = () => {
    const { pathname } = useLocation()
    const { user, isLoading } = useUserContext()
    const imageUrl = useGetImage(user.imageId || "");
    const navigate = useNavigate();

    console.log(user)

    const signOutUser = () => {
        signOutAccount();
        navigate("/log-in");
    }

    return (
        <nav className='leftside-bar'>
            <div className='leftside-inner'>
                <Link to="/" className="flex gap-3 items-center">
                    <div className='leftside-logo'></div>
                </Link>
                {
                    isLoading || !user.email ? (
                        <div className='h-14'>
                            <Loader message="Wait..." />
                        </div>
                    ) : (
                        <Link
                            to={`/profile/${user.id}`}
                            className='leftside-bar_user'
                            title={user.name}
                        >
                            <img
                                src={imageUrl ? imageUrl
                                    :
                                    (user.imageUrl ? user.imageUrl : '/assets/icons/profile-placeholder.svg')
                                }
                                alt='profile'
                                className='h-10 w-10 rounded-full'
                            />
                            <div className='flex flex-col truncate sidebar-username'>
                                <p className='body-bold'>
                                    {user.name}
                                </p>
                                <p className='small-medium text-light-1'>
                                    @{user.username}
                                </p>
                            </div>
                        </Link>
                    )
                }
                <ul className='sidebar-nav-container'>
                    {
                        sidebarLinks.map((link) => {
                            const isActive = pathname === link.route;
                            return (
                                <li
                                    key={link.label}
                                    className={`leftsidebar-link group 
                                    ${isActive && 'nav-link-active'}`}
                                    title={link.label}
                                >
                                    <NavLink
                                        to={link.route}
                                        className="flex gap-4 items-center p-4"
                                    >
                                        <img
                                            src={link.imgURL}
                                            alt={link.label}
                                            className={`sidebar-icons group-hover:invert-white 
                                            ${isActive && 'invert-white'}`}
                                        />
                                        <span>
                                            {link.label}
                                        </span>
                                        <SidebarTooltip label={link.label} />
                                    </NavLink>
                                </li>
                            )
                        })}
                </ul>
                <button
                    className='btn-ghost p-4 absolute bottom-1'
                    onClick={() => signOutUser()}
                >
                    <img src="/assets/icons/logout.svg" alt='logout' />
                    <p className='logout-text'>Logout</p>
                </button>
            </div>
        </nav>
    )
}

export default LeftSidebar