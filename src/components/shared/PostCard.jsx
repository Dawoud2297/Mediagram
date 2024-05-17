import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
import { useUserContext } from '../../context/AuthContext'
import PostStats from './PostStats'
import useGetImage from '../../hooks/useGetImage'

const PostCard = ({ post }) => {

    const imgUrl = useGetImage(post?.imageUrl);
    const { user } = useUserContext();
    const profileImgUrl = useGetImage(post.creator?.imageId);

    if (!post.creator) return (
        <div className='flex flex-col gap-5'>
            <h2 className="h3-bold md:h2-bold text-left w-full">
                Something Went Wrong!
            </h2>
            <button
                className='btn-submit'
                onClick={() => location.reload()}
            >Reload</button>
        </div>
    );

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={profileImgUrl ? profileImgUrl :
                                (post.creator?.imageUrl ? post.creator?.imageUrl : 'assets/icons/profile-placeholder.svg')

                            }
                            alt='creator'
                            className='rounded-full w-12 lg:h-12'
                        />
                    </Link>
                    <div className='flex flex-col'>
                        <p className='base-medium lg:body-bold text-light-1'>
                            {post.creator.name}
                        </p>
                        <div className='flex-center gap-2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>
                                {formatDate(post.$createdAt)}
                                {/* {post.$createdAt} */}
                            </p>
                            -
                            <p className='subtle-semibold lg:small-regular'>
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id && 'hidden'}`}
                >
                    <img
                        src='/assets/icons/edit.svg'
                        width={20}
                        height={20} />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`} className='mb-5'>
                <div className='small-medium lg:base-medium py-5'>
                    <p className='line-clamp-3'>{post.caption}</p>
                    <ul className='flex gap-1 mt-2 truncate'>
                        {post?.tags.map((tag, ind) => (
                            <li
                                key={ind}
                                className='text-light-3'>
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src={imgUrl || '/assets/icons/add-post.svg'}
                    className='post-card_img'
                    alt="post image"
                />
            </Link>
            <PostStats post={post} userId={user.id} />
        </div>
    )
}

export default PostCard