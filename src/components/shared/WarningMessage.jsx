
const WarningMessage = ({ insureAction, message, setAction }) => {
    return (
        <div
            className='absolute left-[10%] top-[40%] md:left-[50%] md:top-[40%] bg-dark-4 p-5 px-10 rounded-lg'>
            <p className='body-bold text-sm'>{message}</p>
            <div className="flex gap-10 items-center justify-between">
                <button
                    className='btn-dark'
                    onClick={() => setAction(false)}
                >
                    Cancel
                </button>
                <button
                    className='btn-submit px-5'
                    onClick={insureAction}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default WarningMessage