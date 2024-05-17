import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
    const [file, setFile] = useState([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback(
        (acceptedFiles) => {
            setFile(acceptedFiles);
            fieldChange(acceptedFiles);
            setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        },
        [file]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });


    useEffect(() => {
        setFileUrl(mediaUrl);
    }, [mediaUrl])


    return (
        <div {...getRootProps()}
            className="col-span-2 flex bg-dark-4 p-5 rounded-xl cursor-pointer"
        >
            <input {...getInputProps()} className="w-1/2" />

            <div className="flex-center gap-4">
                <img
                    src={fileUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="image"
                    className="h-24 w-24 rounded-full object-cover object-top"
                />
                <p className=" text-white font-semibold base-medium md:bbase-semibold">
                    Change profile photo
                </p>
            </div>
        </div>
    );
}

export default ProfileUploader