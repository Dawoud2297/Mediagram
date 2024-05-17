import { Routes, Route } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import SignUp from "./_auth/forms/SignUp"
import SignIn from "./_auth/forms/SignIn"
import { ToastContainer } from "react-toastify"
import RootLayout from "./_root/RootLayout"
import {
  AllUsers, CreatePost, EditPost,
  Explore, Home, LikedPosts, PostDetails,
  Profile, Saved, UpdateProfile
} from "./_root/pages";



function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<SignIn />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/liked-posts" element={<LikedPosts />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
