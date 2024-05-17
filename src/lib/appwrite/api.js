import { account, appwriteConfig, avatars, databases } from "./config";
import { ID, Query } from "appwrite";


// ============================== AUTH USER
export async function createUserAccount(user) {
    try {
        // Create User in Authentication
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        const avatarUrl = avatars.getInitials(user.name);

        const newUserData = {
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        }
        // Save User in DB
        const newUser = await saveUserToDB(newUserData)

        return newUser;
    } catch (error) {
        console.log(error.message);
        return { error: error.message }
    }
}

// ============================== SAVE USER TO DB

export async function saveUserToDB(newUserData) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            newUserData
        )
        return newUser;
    } catch (error) {
        console.log(error.message);
        return { error: error.message }
    }
}

export async function signInAccount(user) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error.message)
        return { error: error.message };
    }
}

// ============================== GET ACCOUNT
export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        console.log(error);
    }
}


// =========================================================
// USER
// ============================================================

// ============================== GET USERS
export async function getUsers(limit) {
    const queries = [Query.orderDesc("$createdAt")];

    if (limit) {
        queries.push(Query.limit(limit));
    }

    try {
        const users = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            queries
        );

        if (!users) throw Error;

        return users;
    } catch (error) {
        console.log(error);
    }
}


// ============================== GET USER BY ID
export async function getUserById(userId) {
    try {
        const user = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            userId
        );

        if (!user) throw Error;

        return user;
    } catch (error) {
        console.log(error);
    }
}

// ============================== GET CURRENT USER

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
        return { error: error.message };
    }
}
// ============================== SIGN OUT

export async function signOutAccount() {
    try {
        // account.deleteSession handles the server-side session invalidation
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        console.log(error)
        return { error: error.message };
    }
}

export async function createPost(post) {
    try {
        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Create post
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: post.imageUrl,
                location: post.location,
                tags
            }
        );

        if (!newPost) {
            throw Error;
        }
        return newPost;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}


// ============================== GET RECENT POSTS


export async function getRecentPosts() {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    );
    if (!posts) throw Error;
    else return posts;
}

// ============================== Like / UnLike POST

export async function likePost(likesData) {
    try {
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            likesData.postId,
            {
                likes: likesData.likesArray
            }
        )
        if (!updatedPost) throw Error;
        return updatedPost
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}



// ============================== Save POST

export async function savePost(savePostData) {
    try {
        const updatedPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                user: savePostData.userId,
                post: savePostData.postId
            }
        )
        if (!updatedPost) throw Error;
        return updatedPost
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}



// ============================== DELETE Saved POST

export async function deleteSavedPost(savedRecordId) {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )
        if (!statusCode) throw Error;
        return { status: "ok" }
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}


// ============================== Edit POST

export async function getPostById(postId) {
    try {
        const post = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
        return post
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}


export async function UpdatePost(post) {
    try {
        // Convert tags into array
        const tags = post.tags?.replace(/ /g, "").split(",") || [];

        // Create post
        const updatedPost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            post.postId,
            {
                caption: post.caption,
                imageUrl: post.imageUrl,
                location: post.location,
                tags
            }
        );

        if (!updatedPost) {
            throw Error;
        }
        return updatedPost;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}

export async function deletePost(postId) {
    if (!postId) throw Error;

    try {
        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId
        )
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}


export async function getInfinitePosts({ pageParam }) {
    const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)]

    if (pageParam) {
        queries.push(Query.cursorAfter(pageParam.toString()))
    }

    try {

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            queries
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}



export async function searchPosts(searchTerm) {
    try {

        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            [Query.search('caption', searchTerm)]
        )

        if (!posts) throw Error;

        return posts;
    } catch (error) {
        console.log(error)
        return { error: error.message }
    }
}



// ============================== UPDATE USER
export async function updateUser(user) {
    try {
        //  Update user
        const updatedUser = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user.userId,
            {
                name: user.name,
                bio: user.bio,
                imageId: user.imageId,
            }
        );

        // Failed to update
        if (!updatedUser) {
            // If no new file uploaded, just throw error
            throw Error;
        }

        return updatedUser;
    } catch (error) {
        console.log(error);
    }
}