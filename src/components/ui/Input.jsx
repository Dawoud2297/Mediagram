const Input = (props) => {
    const {
        type,
        placeholder,
        className,
        name,
        id,
        disabled,
        label,
        register,
        required,
        error
    } = props;


    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="bold-1">
                {label}
            </label>
            <div className="flex flex-row">
                <input
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    className={className}
                    disabled={disabled}
                    {...register(id, { required })}
                />
                {error &&
                    // <div className='pl-2 flex items-center justify-center'>
                    <div
                        className='absolute top-1 left-[50%] bg-dark-4 p-10 rounded-xl text-slate-100'
                    >
                        <span className="font-semibold brightness-200">
                            {error}
                        </span>
                    </div>}
            </div>
        </div>
    )
}

export default Input
