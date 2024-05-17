import * as z from "zod";

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Too Short" }),
    username: z.string().min(4, { message: "Still Short" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Not Strong Yet!" })
})


export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Wrong Password" }),
});



export const postValidation = z.object({
    caption: z.string().min(5).max(2200),
    file: z.custom(),
    location: z.string().min(2, { message: "Location Field" }).max(100),
    tags: z.string().max(200, { message: "Max length of tags is 50 Characters" })
});



export const ProfileValidation = z.object({
    file: z.custom(),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email(),
    bio: z.string(),
});
