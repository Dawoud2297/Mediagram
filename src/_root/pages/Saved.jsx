import React from 'react'
import { useGetCurrentUser } from '../../lib/react-query/qAndMutations'
import Loader from '../../components/shared/Loader';
import GridPostList from '../../components/shared/GridPostList';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Saved = () => {

    const { data: currentUser } = useGetCurrentUser();
    const savedPosts = currentUser?.save.map((savedPost) => ({
        ...savedPost.post,
        creator: {
            imageUrl: currentUser.imageUrl
        }
    })).reverse();

    useDocumentTitle("Mediagram/Saved-Posts")


    return (
        <div className='saved-container'>
            <div className='flex gap-2 w-full max-w-5xl'>
                <img
                    src='/assets/icons/saved.svg'
                    width={36}
                    height={36}
                    alt="edit"
                    className="invert-white"
                />
                <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
            </div>
            {
                !currentUser ? (
                    <Loader />
                ) : (
                    <ul className='w-full flex justify-center max-w-5xl gap-9'>
                        {
                            savedPosts.length === 0 ? (
                                <p className='text-light-4'>No available posts</p>
                            ) : (
                                <GridPostList
                                    posts={savedPosts}
                                    showStats={false}
                                    showUser={false}
                                />
                            )
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default Saved