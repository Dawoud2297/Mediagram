
const Loader = (props) => {
    const { height, width, message } = props;

    return (
        <div className='flex gap-2 text-white'>
            <img
                src='/assets/icons/loader.svg'
                alt='loader'
                height={height}
                width={width}
            />
            <span>{message}</span>
        </div>
    )
}

export default Loader