import { useEffect, useState } from 'react'
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '../../lib/react-query/qAndMutations'
import { checkIsLiked } from '../../utils/helpers';
import Loader from './Loader';

const PostStats = ({ post, userId }) => {

    const likesList = post?.likes?.map((user) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSaving } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isUnsaving } = useDeleteSavedPost();

    const { data: currentUser } = useGetCurrentUser()


    /**
     Handle Like Post
     **/
    const handleLikePost = (e) => {
        e.stopPropagation();

        let likesArray = [...likes];
        const hasLiked = likesArray.includes(userId);

        if (hasLiked) {
            likesArray = likesArray.filter((id) => id !== userId);
        } else {
            likesArray.push(userId);
        }
        setLikes(likesArray);
        likePost({ postId: post.$id, likesArray }) // React Query
    }

    /**
     Handle Save Post
     **/
    const savedPostRecord = currentUser?.save.find(
        (record) => record.post?.$id === post.$id
    );

    const handleSavePost = (e) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            deleteSavedPost(savedPostRecord.$id)
        } else {
            savePost({ postId: post.$id, userId });
            setIsSaved(true);
        }
    }

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])


    return (
        <div className='flex justify-between items-center z-20'>
            <div className='flex gap-2 mr-5'>
                <img
                    src={checkIsLiked(likes, userId)
                        ? '/assets/icons/liked.svg'
                        : '/assets/icons/like.svg'
                    }
                    alt='like'
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className='cursor-pointer'
                />
                <p className='small-medium lg:base-medium'>{likes?.length}</p>
            </div>
            <div className='flex gap-2'>
                {
                    isSaving || isUnsaving
                        ? <Loader width={20} height={20} />
                        : <img
                            src={isSaved
                                ? '/assets/icons/saved.svg'
                                : '/assets/icons/save.svg'
                            }
                            alt='like'
                            width={20}
                            height={20}
                            onClick={handleSavePost}
                            className='cursor-pointer'
                        />
                }
            </div>
        </div>
    )
}

export default PostStats