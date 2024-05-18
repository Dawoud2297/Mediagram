import Input from '../../components/ui/Input'
import Loader from '../../components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useCreateUserAccount } from '../../lib/react-query/qAndMutations'
import { useForm } from "react-hook-form"
import { SignupValidation } from "../../lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { authError } from '../../utils/response'

const SignUp = () => {

    /**Form */
    const {
        register,
        handleSubmit,
        // isSubmitting used for form fields errors
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(SignupValidation) })

    /**Hooks */
    // isPending is used for api errors
    const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();
    const navigate = useNavigate();


    /**On Submit */
    const onSubmit = async (data) => {
        const newUser = await createUserAccount(data);
        if (newUser.error) {
            return authError(newUser.error);
        } else {
            navigate("/log-in")
        }
    }


    return (
        <div className="form-container">
            <div className="form-logo">
                <img
                    src='/assets/images/A2mBrothers Light.svg'
                    alt='logo'
                    width={450}
                />
                <h2>Discover A New World</h2>
            </div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    label="Name"
                    id="name"
                    register={register}
                    className="form-input"
                    placeholder="Name"
                    required="Name is Required"
                    error={errors.name?.message}
                />
                <Input
                    type="text"
                    label="User Name"
                    id="username"
                    register={register}
                    className="form-input"
                    placeholder="User Name"
                    error={errors.username?.message}
                />
                <Input
                    type="email"
                    label="Email"
                    id="email"
                    register={register}
                    className="form-input"
                    placeholder="Email"
                    error={errors.email?.message}
                />
                <Input
                    type="password"
                    label="Password"
                    id="password"
                    register={register}
                    className="form-input"
                    placeholder="Password"
                    error={errors.password?.message}
                />
                <button type="submit" className="btn-submit">
                    {
                        isSubmitting || isPending ? <Loader
                            height="24"
                            width="24"
                            message="Loading..."
                        /> : 'Sign Up'
                    }
                </button>
            </form>
            <p className="go-to">
                <span>
                    Already have an account?
                </span>
                <Link to="/log-in" className="text-blue-950">
                    Log in
                </Link>
            </p>
        </div>
    )
}

export default SignUp
