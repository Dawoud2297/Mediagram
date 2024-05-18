import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'


const FileUploader = ({ fieldChange, mediaUrl }) => {

    const [file, setFile] = useState([])
    const [fileUrl, setFileUrl] = useState(mediaUrl);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg', '.svg']
        }
    })

    useEffect(() => {
        setFileUrl(mediaUrl);
    }, [mediaUrl])


    return (
        <div {...getRootProps()}
            className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
        >
            <input
                {...getInputProps()}
                className="cursor-pointer"
            />
            {
                fileUrl ? (
                    <>
                        <div className="flex flex-1 justify-center w-full p-2 lg:p-10">
                            <img
                                src={fileUrl}
                                alt='img'
                                className='file_uploader-img'
                            />
                        </div>
                        <p className='file_uploader-label'>
                            Click or Drag photo to replace!
                        </p>
                    </>
                ) : (
                    <div className="file_uploader-box">
                        <img
                            src='/assets/icons/file-upload.svg'
                            width={96}
                            height={77}
                            alt='file-upload'
                        />
                        <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag Photo Here!</h3>
                        <p
                            className='text-light-4 small-regular mb-6'
                        >
                            SVG, PNG, JPG
                        </p>
                        <button className='flex button-dark-4 flex-center'>Select from computer</button>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader