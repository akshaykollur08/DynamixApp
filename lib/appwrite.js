// Within this, we can create and export a new appwrite config Object
// Which will look something like this:
// Import for the Client, Account, and ID
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig =
{
    // The data is taken from appwrite, creations of databases, link, platform/project name, project's id, db id, etc
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.AK.aoraPractice",
    projectId: '669f18af003339b505ad',
    databaseId: '669f194f003464cbdd3c',
    usersCollectionId: '669f196000060aaf422b',
    videosCollectionId: '669f197300295f48fbe7',
    storageId: '669f1cff001e3b73803a',




}



// Addition to the appwrite.js configure file with:
// inialization of the Software Development Kit with your Appwrite server API endpoint and project ID which can be found in the projects
// settings page
// Import the Client
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.

// account gets a variable
const account = new Account(client);
// Avatars is passed with client from react native appwrite
const avatars = new Avatars(client)
// We also need databases to store various datasets
const databases = new Databases(client);
// We need a storage bucket to store simple data in
const storage = new Storage(client);




// Creation of a arrow function variable
// We can export it so we can use it for other areas, mostly and importantly for signing up!
// Since we are awaiting we also need to make our function ASYNC!
export const createUser = async (email, password, username) =>
{
    // Register User
    // Call account.create and it creates a unique id, email address, password, and username
    try
    {
        // When the user creates a new account, it creates new data such as a unique id, their email, password, and their username
        const newAccount = await account.create
            (
                ID.unique(),
                email,
                password,
                username,

            )
        // If the newAccount was not made an error is thrown
        if (!newAccount)
        {
            // If newAccount was not made then it throws a new error
            throw new Error(error);
        }

        // If the newAccount was in existence then the pfp/avatar is updated
        // A new Account with client data is made
        // Basically, once the user creates their account their pfp is just their initials in a circular cutout
        const avatarUrl = avatars.getInitials(username);


        await signIn(email, password);
        // Once we have the new user, we can load in various data into our database
        // Mainly useful for when the user SIGNS UP!
        const newUser = databases.createDocument(
            // Load in the databaseId
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            // User get s a new id
            ID.unique(),
            // Pass the Object with all the parameters of a user
            // Creation of a new instance of the user
            {
                // The Object has an accountId which is set to the newAccount's id object level value,
                // They get their inputted email, username, and avatar parameter which is set to the url of their avatar from
                // getting their initials of their username
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            }


        );
        // 
        return newUser;



    }
    catch (error)
    {
        console.log(error);
        throw new Error(error);
    }
    // Initial test to see if the button works
    // account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response) {
    //         console.log(response);
    //     }, function (error) {
    //         console.log(error);
    //     });

}

// Change this signIn function to an ES6 JS function since the other ones are also arrow functions, this is the format
// export const createUser = async (email, password, username) =>
export const signIn = async (email, password) =>
{
    // In this try block we will establish a new session to sign in by doing the following...
    try
    {
        // Deletes current session, to remove the bug of saying: "Creation of a session is prohibited when a session is active"!
        // await account.deleteSession("current");
        // Special function called createEmailPasswordSession(param, param) that allows there to be a new session for when the user signs
        // in
        // If there is already a session return that if not create a new one!

        const newSession = await account.createEmailPasswordSession(email, password);

        // const currentSession = await account.getSession("current");
        // // If there exists a currentSession then output 
        // // !Gets rid of the permissions error of the const account having guest permissions!
        // if(!account.getSession())
        // {
        //     // If there is no currentSession, create a new one by grabbing user inputted email and password as designed!
        //     const newSession = await account.createEmailPasswordSession(email, password)
        //     return newSession;
        // }
        // else
        // {
        //     await account.deleteSession("current");
        //     // Creates a new session regardless to eliminate guest override issues
        //     const newSession = await account.createEmailPasswordSession(email, password);
        //     return newSession;

        // }


        // If there is no currentSession, create a new one by grabbing user inputted email and password as designed!
        // const newSession = await account.createEmailPasswordSession(email, password)
        // Once we have the session, we can simply return it!
        // return newSession;
        return newSession;




    }
    catch (error)
    {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () =>
{
    try
    {
        // account is the const for the global Account new client var
        const currentAccount = await account.get();

        // If the currentAccount does not exist then an error is thrown
        if (!currentAccount)
        {
            throw Error;
        }
        // If the currentAccount is there
        // ...collect it from the database of users! 
        // It is the waiting for the databases pieces of the listing of documents
        // ?
        // **You must return the currentAccount not the currentUser, that does not work
        // ?
        //? const currentUser = await databases.listDocuments(
        // Now we need to search for that specific user!
        //   ?  appwriteConfig.databaseId,
        //  ?   appwriteConfig.usersCollectionId,
        // This Query react tool helps search for the pinpointed user!
        // Checks if the accountId is equal to the currentAccount's id!
        // ?    [Query.equal('accountId', currentAccount.$id)]

        // ?);

        // If there exists no currentUser... toss an error
        // if(!currentUser)
        // {
        //     throw Error;
        // }

        // Return the currentAccount active since we only need one user using! not a bunch
        return currentAccount;

    }
    // Handle of the error that occured
    catch (error)
    {
        console.log(error);
    }
}
// Need to access the videos in the database of videos colelction
// videosCollectionId
// HAve an export function for getting the posts asynchronously
// We will utilize this in the Home tab section!
export const getAllVideosPost = async () =>
{
    try
    {
        // posts constant variable awaits the holding of the databases made from the client
        // It contains the db id and the videos collection id since each post is a video!
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            // [Query.orderDesc('$createdAt', Query.limit(7))]

        )

        // The documents of the posts are outputted
        return posts.documents;
    }
    catch (error)
    {
        throw new Error(error);
    }
}

export const getLatestPosts = async () =>
{
    try
    {
        // posts constant variable awaits the holding of the databases made from the client
        // It contains the db id and the videos collection id since each post is a video!
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            // ?Only difference between the getLtestPosts and getAllPosts is this**
            // The query ordered in descending order and passes the func of $createdAt and has a limit of the query of 7, since that is 
            // how much videos we want
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        // The documents of the posts are outputted
        return posts.documents;
    }
    catch (error)
    {
        throw new Error(error);
    }
}

// Make a function that is used to search for the posts , with query being the parameter to help store the data
export const searchPosts = async (query) =>
{
    try
    {

        // posts constant variable awaits the holding of the databases made from the client
        // It contains the db id and the videos collection id since each post is a video!
        // 
        // ! Same as the other functions!!, listing the documents, 
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            // ? only differenction ebtween this function and the getLatestPosts function is that instead ofthe orderDesc function
            // ? We will be utilizing the search function.
            // ? The Query will use a search algorithm to search and sift for things that the user wants to discover
            // ? For the search term, we will be use query, that is it
            // * Created a fulltext index in the backend via appwrite console to override the measly error
            // Creates the fulltex tindex for title!, solves the errorr of AppwriteException: Searching by 
            // attribute "title" requires a fulltext index.
            // 
            [Query.search("title", query)]
            // * No more changes!
        )
        if (!posts)
        {
            throw new Error("Something went wrong");
        }

        // The documents of the posts are outputted
        return posts.documents;
    }
    catch (error)
    {
        console.log(error);
        throw new Error(error);
    }
}

// Make a function that is used to search for the user created posts , with query being the parameter to help store the data
export const searchUserPosts = async (userId) =>
{
    try
    {
        // posts constant variable awaits the holding of the databases made from the client
        // It contains the db id and the videos collection id since each post is a video!
        // 
        // ! Same as the other functions!!, listing the documents, 
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            // ? only differenction ebtween this function and the searchPosts is that, the query function algorithm is different
            // ? We use the equal algorithm to check if the creator is equal to the userId
            // * Created a fulltext index in the backend via appwrite console to override the measly error
            // Creates the fulltex tindex for title!, solves the errorr of AppwriteException: Searching by 
            // attribute "title" requires a fulltext index.
            // 
            [Query.equal("creator", userId)]
            // * No more changes, else the rest is the same as the searchPosts!
        )
        if (!posts)
        {
            throw new Error("Something went wrong");
        }

        // The documents of the posts are outputted
        return posts.documents;
    }
    catch (error)
    {
        console.log(error);
        throw new Error(error);
    }
}

// Create another appwrite function to logout the users!
export const logoutUser = async () =>
{
    try
    {
        // Deletes the current session of the user, in our case, akshaykollur08
        const session = await account.deleteSession('current');
        // Then simply return that session ending it and logging out the user, in our case, akshaykollur08!
        return session;
    }
    catch (error)
    {
        throw new Error(error);
    }
}

// Create a function for the getFilePreview
// The params accepted at the file's id and the file's type respectively!
export const getFilePreview = async (fileId, fileType)=>
{
    let fileUrl = '';
    try
    {
        if(type==="video")
        {
            // This getFileView basically takes in 2 parasm: storageId and fileId!
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId)
        }
        else if(type==="image")
        {
            // FIRST TIME USING RECURSION IN REACT NATIVE!
            // The 2000s are for the h and w, the top is for the gravity feature and the 100 is for quality, 100 percent!
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100)
        }
    } catch (error)
    {
        throw new Error(error);
    }
}


// Create a function to upload the files to the database!
// We will utilize this to upload the user files/data to AppWrite DB
export const uploadFile = async (file, type) =>
{
    // If there is no existence of the file simply just release it to the user, exit out of the function
    if (!file)
    {
        return;
    }

    // Next we want to grab data from the file, so spread with a mimeType and spread the rest of the data throughout
    const { mimeType, ...rest } = file;
    // Create an asset for the file
    // Rename the type to mimeType and change up the fileage



    // Then we will try a try and catch block to try out some code
    // We will be storing the file in a var knonw as uploadedFile by storing it in a storage bucket, think about this like 
    // AWS's S3 bucket system
    try
    {
        // We pass various pieces of data to the storage to actually create the file
        // We pass the storageID, ID.unqiue, and the actual asset/filage
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        )

        

        // The file url will be the async grab of the preview of the uploadedFile's 
        // id and the type will be secon param for the preview/url
        // ?
        // We will in fact create a function for the getFilePreview
        const fileUrl = await getFilePreview(uploadedFile.$id, type);

        return fileUrl;
    }
    catch (error)
    {
        return new Error(error);
    }

}


// Create a function to create the Video for the user to be on their feed/posted for all various users
export const createVideo = async (form) =>
{
    try
    {
        const [thumbnailUrl, videoUrl] = await Promise.all(
            [
                uploadFile(form.thumbnail, 'image'),
                uploadFile(form.video, 'video')
            ]
        )

        // Pass in all pieces such as all pieces of the form stateful variable in terms for an Object array
        // , databaseId for upload to the db, collections id,
        // unique numeric id for referencing
        const newPost = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.videosCollectionId
            ,ID.unique(), {title: form.title, thumbnail: form.thumbnailUrl, video: form.videoUrl, prompt: form.prompt,
                creator: form.userId
            }
        );

        // Front end return is the newPost with all the things that took in the data of the create screen
        return newPost;
    }
    catch (error)
    {
        throw new Error(error);
    }
}



