import SinglePostInGridList from './SinglePostInGridList';

const GridPostList = ({ posts, showUser = true, showStats = true }) => {

    return (
        <ul className='grid-container'>
            {
                posts.map((post) => (
                    <SinglePostInGridList
                        key={post.$id}
                        post={post}
                        showUser={showUser}
                        showStats={showStats}
                    />
                ))
            }
        </ul>
    )
}

export default GridPostList