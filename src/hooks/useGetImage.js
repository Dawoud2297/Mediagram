import { useEffect, useState } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '../lib/firebase/config'

const useGetImage = (imageSrc = "") => {
    const [imgUrl, setImgUrl] = useState("")


    useEffect(() => {
        const getPostPhoto = () => {
            if (!imageSrc) return "";
            const imageRef = ref(firebaseStorage, imageSrc)
            getDownloadURL(imageRef).then(url => {
                setImgUrl(url)
            }).catch((error) => {
                console.error('Error retrieving download URL:', error);
            });
        }
        getPostPhoto()
    }, [imageSrc])

    return imgUrl;
}

export default useGetImage