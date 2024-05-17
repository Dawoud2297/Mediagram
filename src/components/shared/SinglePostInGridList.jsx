import useGetImage from '../../hooks/useGetImage'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/AuthContext'
import PostStats from './PostStats'

const SinglePostInGridList = ({ post, showUser, showStats }) => {
    const imgUrl = useGetImage(post.imageUrl)
    const profileImgUrl = useGetImage(post.creator?.imageId || "")
    const { user } = useUserContext()


    return (
        <li className='relative min-w-80 h-80'>
            <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                <img
                    src={imgUrl}
                    alt='post'
                    className='h-full w-full object-cover'
                />
            </Link>
            <div className='grid-post_user'>
                {
                    showUser && (
                        <div className='flex items-center justify-start gap-2 flex-1'>
                            <img
                                src={
                                    profileImgUrl ? profileImgUrl :
                                        (post.creator?.imageUrl ? post.creator?.imageUrl : '/assets/icons/profile-placeholder.svg')
                                }
                                alt='creator'
                                className='h-8 w-8 rounded-full'
                            />
                            <p className='line-clamp-1'>
                                {post.creator.name}
                            </p>
                        </div>
                    )
                }
                {
                    showStats &&
                    <span className={!showUser && 'w-full'}>
                        <PostStats post={post} userId={user.id} />
                    </span>
                }
            </div>
        </li>
    )
}

export default SinglePostInGridList