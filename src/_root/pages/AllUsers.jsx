import Loader from '../../components/shared/Loader';
import UserCard from '../../components/shared/UserCard'
import { useUserContext } from '../../context/AuthContext';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useGetUsers } from '../../lib/react-query/qAndMutations'


const AllUsers = () => {

    const { data: creators, isLoading, isError } = useGetUsers();
    const { user } = useUserContext();

    const allUsers = creators?.documents.filter((creator) => creator.$id !== user.id)

    useDocumentTitle("Mediagram/People")

    if (isError) {
        return (
            <div className=' flex flex-col'>
                <h2 className="h3-bold md:h2-bold text-left w-full">
                    Something Went Wrong!
                </h2>
                <button onClick={() => location.reload()}>Reload</button>
            </div>
        )
    }


    return (
        <div className='common-container'>
            <div className='user-container'>
                <h2 className="h3-bold md:h2-bold text-left w-full">Other Users</h2>
                {
                    isLoading && !creators ? (
                        <Loader />
                    ) : (
                        <ul className='user-grid'>
                            {
                                allUsers.map((creator) => (
                                    <li
                                        key={creator?.$id}
                                        className='flex min-w-[200px] w-full'
                                    >
                                        <UserCard user={creator} />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default AllUsers