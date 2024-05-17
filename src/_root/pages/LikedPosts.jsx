import { useGetCurrentUser } from '../../lib/react-query/qAndMutations'
import GridPostList from '../../components/shared/GridPostList';

const LikedPosts = () => {
    const { data: currentUser } = useGetCurrentUser();

    if (!currentUser) {
        return (
            <div className='flex flex-col gap-5'>
                <h2 className="h3-bold md:h2-bold text-left w-full">
                    Something Went Wrong!
                </h2>
                <button
                    className='btn-submit'
                    onClick={() => location.reload()}
                >Reload</button>
            </div>
        )
    }

    return (
        <div>
            {
                currentUser.liked.length === 0 ? (
                    <p className="text-light-4">No liked posts</p>
                ) : (
                    <GridPostList posts={currentUser.liked} showStats={false} />
                )
            }

        </div>
    )
}

export default LikedPosts