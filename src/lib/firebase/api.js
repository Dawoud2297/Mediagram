import { firebaseStorage } from './config';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';

export async function uploadImage(imgData) {
    try {
        const imageRef = ref(
            firebaseStorage,
            `posts-images/${imgData.userId}/${imgData.file.name}`
        );
        const uploadPhoto = await uploadBytes(imageRef, imgData.file);
        return uploadPhoto.metadata.fullPath;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deleteImage(imagePath) {
    try {
        const oldImgRef = ref(
            firebaseStorage,
            imagePath
        );
        await deleteObject(oldImgRef);
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}


export async function uploadUserImage(imgData) {
    try {
        const imageRef = ref(
            firebaseStorage,
            `posts-images/${imgData.userId}/profile-image/${imgData.file.name}`
        );
        const uploadPhoto = await uploadBytes(imageRef, imgData.file);
        return uploadPhoto.metadata.fullPath;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}
