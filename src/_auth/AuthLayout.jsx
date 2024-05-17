import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="flex h-screen">
            <section className="formContainer">
                <Outlet />
            </section>
            {/* <img
                src="/assets/images/side-img.svg"
                alt="logo"
                className="sideImg"
            /> */}
            <video
                className="sideImg"
                autoFocus
                autoPlay
                muted
                preload="auto"
                loop
                poster="/assets/images/side-img.svg"
            >
                <source
                    src="/assets/video/authdesign.mp4"
                    type="video/mp4"
                />
            </video>
        </div>
    )
}

export default AuthLayout
