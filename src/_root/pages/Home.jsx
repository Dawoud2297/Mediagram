import Loader from "../../components/shared/Loader";
import PostCard from "../../components/shared/PostCard";
import { useGetRecentPosts } from "../../lib/react-query/qAndMutations";


const Home = () => {

    const { data: posts, isPending } = useGetRecentPosts()


    return (
        <div className="flex flex-1 w-full">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">
                        Home Feed
                    </h2>
                    {
                        isPending && !posts ? (
                            <Loader />
                        ) : (
                            <ul className="flex flex-col flex-1 gap-9 w-full">
                                {
                                    posts.documents.map((post) => (
                                        <PostCard key={post.$id} post={post} />
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
