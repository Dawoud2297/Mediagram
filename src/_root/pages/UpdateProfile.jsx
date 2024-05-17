import React from 'react'
import Input from '../../components/ui/Input'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserContext } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { ProfileValidation } from '../../lib/validation'
import { useGetUserById, useUpdateUser } from '../../lib/react-query/qAndMutations'
import ProfileUploader from '../../components/shared/ProfileUploader'
import Loader from '../../components/shared/Loader'
import { uploadUserImage } from '../../lib/firebase/api'
import { createPostError } from '../../utils/response'
import useGetImage from '../../hooks/useGetImage'

const UpdateProfile = () => {
    const { id } = useParams();
    const { user, setUser } = useUserContext();
    const { data: currentUser } = useGetUserById(id || "");
    const imageId = useGetImage(currentUser?.imageId || "");
    const mediaUrl = imageId ? imageId
        :
        (user?.imageUrl ? user?.imageUrl : '/assets/icons/profile-placeholder.svg')

    const { mutateAsync: updateUser, isLoading: isLoadingUpdate } = useUpdateUser();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            file: [],
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio || ""
        },
    })

    console.log(errors)
    console.log({ user, currentUser })

    if (!currentUser)
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );


    const onSubmit = async (data) => {
        const imageUrl = await uploadUserImage({
            userId: user.id,
            file: data.file[0]
        })
        const updatedUser = await updateUser({
            userId: currentUser.$id,
            name: data.name,
            bio: data.bio,
            file: data.file,
            imageId: imageUrl,
            // password: data.password,
        });
        console.log(imageUrl)

        if (!updatedUser) {
            createPostError('Update user failed. Please try again.');
            return;
        }

        setUser({
            ...user,
            name: updatedUser?.name,
            bio: updatedUser?.bio,
            imageId: imageUrl,
            imageUrl,
        });
        return navigate(`/profile/${id}`);
    }



    return (
        <div className='flex flex-1'>
            <div className='common-container'>
                <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
                    <img
                        src='/assets/icons/edit.svg'
                        width={36}
                        height={36}
                        className='invert-white'
                    />
                    <h2 className='h3-bold md:h2-bold text-left w-full'>
                        Edit Profile
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-10 w-full'>
                    <Controller
                        render={({ field }) =>
                            <ProfileUploader
                                fieldChange={field.onChange}
                                mediaUrl={mediaUrl}
                            />}
                        name='file'
                        control={control}
                    />
                    <Input
                        type="text"
                        label="name"
                        className="post_form-input"
                        id="name"
                        register={register}
                    />
                    <Input
                        type="text"
                        label="username"
                        className="post_form-input"
                        id="username"
                        register={register}
                        disabled
                    />
                    <Input
                        type="email"
                        label="email"
                        className="post_form-input"
                        id="email"
                        register={register}
                        disabled
                    />
                    {/* <Input
                        type="password"
                        label="password"
                        className="post_form-input"
                        id="password"
                        register={register}
                    /> */}
                    <textarea
                        id="bio"
                        {...register('bio')}
                        className="textarea-dark col-span-2"
                        placeholder='Bio'
                        rows="8"
                        name='bio'
                    >
                    </textarea>
                    <div className="flex gap-4 items-center justify-end col-span-2">
                        <button
                            type="button"
                            className="btn-dark"
                            onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-submit whitespace-nowrap"
                            disabled={isSubmitting || isLoadingUpdate}>
                            {(isLoadingUpdate || isSubmitting) ? <Loader
                                height="24"
                                width="24"
                                message="Loading..." /> : 'Update Profile'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile