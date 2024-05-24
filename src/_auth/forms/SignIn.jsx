import Input from '../../components/ui/Input'
import Loader from '../../components/shared/Loader'
import { Link, useNavigate } from 'react-router-dom'
import { useSignInAccount } from '../../lib/react-query/qAndMutations'
import { useUserContext } from '../../context/AuthContext'
import { useForm } from "react-hook-form"
import { SigninValidation } from "../../lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { authError } from '../../utils/response'
import useDocumentTitle from '../../hooks/useDocumentTitle'


const SignIn = () => {

    /**Form */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({ resolver: zodResolver(SigninValidation) })
    /**Hooks */
    const navigate = useNavigate();
    const { checkAuthUser } = useUserContext();
    const { mutateAsync: signinAccount, isPending: isSigningIn } =
        useSignInAccount();

    /**On Submit */
    const onSubmit = async (data) => {
        const session = await signinAccount(data);
        if (session.error) {
            return authError(session.error)
        } else {
            const isLoggedIn = await checkAuthUser();

            if (isLoggedIn) {
                navigate("/")
            } else {
                return authError("Invalid Credentials, Please check email & password inputs")
            }
        }
    }

    useDocumentTitle("Mediagram/Log-In")


    return (
        <div className="form-container">
            <div className="form-logo">
                <img src='/assets/images/logo.svg' alt='logo' width={400} />
                <h2>Welcome Back Friend!</h2>
            </div>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
                        isSubmitting || isSigningIn ? <Loader
                            height="24"
                            width="24"
                            message="Loading..."
                        /> : 'Log In'
                    }
                </button>
            </form>
            <p className="go-to">
                <span>
                    Already have an account?
                </span>
                <Link to="/sign-up" className="text-blue-950">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default SignIn