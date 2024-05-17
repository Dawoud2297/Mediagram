import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { postValidation } from '../../lib/validation'
import Input from '../ui/Input'
import { useNavigate } from 'react-router-dom'
import FileUploader from '../shared/FileUploader'
import { useCreatePost, useUpdatePost } from '../../lib/react-query/qAndMutations'
import { useUserContext } from '../../context/AuthContext'
import { createPostError, successMessage } from '../../utils/response'
import useGetImage from '../../hooks/useGetImage'
import Loader from '../shared/Loader'
import { deleteImage, uploadImage } from '../../lib/firebase/api'

const PostForm = ({ post, action }) => {

    const imgUrlValue = post ? post?.imageUrl : "";
    const imgUrl = useGetImage(imgUrlValue)
    // Form
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: zodResolver(postValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(",") : "",
        },
    })
    const navigate = useNavigate();

    console.log(errors)

    // Submit Post Data
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
    const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
    const { user } = useUserContext();


    const onSubmit = async (data) => {
        let imagePath = "";

        /**
         Update An Existing Post
         **/
        if (post && action === 'Update') {
            // Delete Old Image
            if (data.file[0]) {
                deleteImage(post.imageUrl);
                imagePath = await uploadImage({
                    userId: user.id,
                    file: data.file[0]
                })
            } else if (!data.file[0] && !post.imageUrl) {
                return createPostError("Image Is Required!")
            } else imagePath = post.imageUrl;


            const updatedPost = await updatePost({
                ...data,
                postId: post.$id,
                imageUrl: imagePath
            });
            if (!updatedPost) {
                createPostError(updatePost.error);
                throw Error;
            }
            successMessage("Post Is Updated Successfully!")
            return navigate(`/posts/${post.$id}`)
        }

        if (!data.file[0]) {
            return createPostError("Image Is Rquired!")
        } else {
            imagePath = await uploadImage({
                userId: user.id,
                file: data.file[0]
            })
        }

        /**
         Create New Post
         **/

        const newPost = await createPost({
            ...data,
            imageUrl: imagePath,
            userId: user.id
        })
        if (newPost.error) {
            createPostError(newPost.error);
        } else {
            successMessage("Post Created Successfully!")
            navigate("/")
        }
    }
    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5 w-full max-w-5xl'
        >
            <label htmlFor='caption'>
                Caption
            </label>
            <textarea
                id="caption"
                {...register('caption')}
                className="textarea-dark"
                placeholder='Caption'
                rows="8"
                name='caption'
            >
            </textarea>
            <label>Add Photo</label>
            <Controller
                render={({ field }) =>
                    <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={imgUrl}
                    />}
                name='file'
                control={control}
            />
            <Input
                type="text"
                label="Add Location"
                id="location"
                register={register}
                placeholder="location"
                className="post_form-input"
                error={errors.location?.message}
            />
            <Input
                type="text"
                label="Add Tags (separated by comma ` , `)"
                id="tags"
                register={register}
                placeholder="Art, Expression, Learn"
                className="post_form-input"
                error={errors.tags?.message}
            />
            <div className="flex gap-4 items-center justify-end">
                <button
                    type="button"
                    className="btn-dark"
                    onClick={() => navigate(-1)}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-submit whitespace-nowrap"
                    disabled={isSubmitting || isCreating || isUpdating}
                >
                    {
                        (isCreating || isUpdating)
                            ? <Loader width={24} height={24} message={isUpdating ? 'Updating' : 'Creating'} />
                            : `${action} Post`
                    }
                </button>
            </div>
        </form>
    )
}

export default PostForm