import { useDeletePost, useGetPostById } from '../../lib/react-query/qAndMutations'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/shared/Loader';
import { formatDate } from '../../utils/formatDate';
import useGetImage from '../../hooks/useGetImage';
import { useUserContext } from '../../context/AuthContext';
import PostStats from '../../components/shared/PostStats';
import { deleteImage } from '../../lib/firebase/api';
import { successMessage } from '../../utils/response';
import { useState } from 'react';
import WarningMessage from '../../components/shared/WarningMessage';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const PostDetails = () => {

    const { id } = useParams();
    const { data: post, isPending } = useGetPostById(id || '');
    const { mutate: deletePost } = useDeletePost();
    const { user } = useUserContext();
    const [insureToDelete, setInsureToDelete] = useState(false);

    const navigate = useNavigate();
    const imgUrl = useGetImage(post?.imageUrl);
    const profileImgUrl = useGetImage(post?.creator.imageId || "");


    const handleDeletePost = () => {
        deleteImage(post?.imageUrl);
        deletePost(id);
        successMessage("Post Deleted Successfully");
        navigate(-1);
        setInsureToDelete(false);
    }

    useDocumentTitle("Mediagram/Post-Details")

    return (
        <>
            <div
                className={`post_details-container ${insureToDelete ? ' opacity-0' : ''}`}
            >
                {isPending
                    ? <Loader />
                    : (
                        <div className='post_details-card'>
                            <img
                                src={imgUrl}
                                alt='post-img'
                                className='post_details-img'
                            />
                            <div className='post_details-info'>
                                <div className='flex-between w-full'>
                                    <Link
                                        to={`/profile/${post?.creator.$id}`}
                                        className='flex items-center gap-3'
                                    >
                                        <img
                                            src={profileImgUrl ? profileImgUrl :
                                                (post.creator.imageUrl ? post.creator.imageUrl : 'assets/icons/profile-placeholder.svg')
                                            }
                                            alt='creator'
                                            className='rounded-full w-8 h-8 lg:w-12 lg:h-12'
                                        />
                                        <div className='flex flex-col'>
                                            <p className='base-medium lg:body-bold text-light-1'>
                                                {post?.creator.name}
                                            </p>
                                            <div className='flex-center gap-2 text-light-3'>
                                                <p className='subtle-semibold lg:small-regular'>
                                                    {formatDate(post?.$createdAt)}
                                                    {/* {post.$createdAt} */}
                                                </p>
                                                -
                                                <p className='subtle-semibold lg:small-regular'>
                                                    {post?.location}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className='flex-center gap-4'>
                                        {
                                            user?.id === post?.creator.$id
                                            &&
                                            (
                                                <>
                                                    <Link to={`/update-post/${post?.$id}`}>
                                                        <img
                                                            src='/assets/icons/edit.svg'
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </Link>
                                                    <button
                                                        onClick={() => setInsureToDelete(true)}
                                                        className='post_details-delete_btn'
                                                    >
                                                        <img
                                                            src="/assets/icons/delete.svg"
                                                            alt='delete'
                                                            width={24}
                                                            height={24}
                                                        />
                                                    </button>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <hr className='border w-full border-dark-4/80' />
                                <div
                                    className='grid grid-cols-2 gap-5 line-clamp-2'
                                >
                                    <p className='col-span-2'>{post?.caption}</p>
                                    <ul
                                        className='col-span-3 grid grid-cols-4 place-items-start mt-2'
                                    // className="flex gap-1 mt-2 line-clamp-1"
                                    >
                                        {post?.tags.map((tag, ind) => (
                                            <li
                                                key={ind}
                                                className='text-light-3 small-regular'
                                            >
                                                #{tag}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='w-full mt-auto'>
                                    <PostStats
                                        post={post}
                                        userId={user.id}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            {
                insureToDelete
                &&
                <WarningMessage
                    insureAction={handleDeletePost}
                    message="Submit Deleting This Post"
                    setAction={setInsureToDelete}
                />
            }
        </>

    )
}

export default PostDetails