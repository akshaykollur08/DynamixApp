// Enter rnfes to get react redux snippet
// This is if you want to create a profile route with the component RootLayout
// import { StyleSheet, Text, View } from 'react-native'
// import { Text, View } from 'react-native'
// import React from 'react'

// const Profile = () => {
//   return (
//     <View className="flex-1 items-center justify-center bg-white">
//       <Text className="text-black">Profile</Text>
//     </View>
//   )
// }

// export default Profile

// No longer need StyleSheet since we are using tailwind nativewind css
// const styles = StyleSheet.create({
//   container:
//   {
//     display: "flex",
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",


//   }
// })
// ? Copy of the query to the profile file!
import { View, Text, FlatList, Image, RefreshControl, Alert, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
// Import for Status bar that will change color for the content in the top such as time, battery, etc for app
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
// Imports for some constants for images
import { icons, images } from '../../constants'

// Imports for the SearchInput component
import SearchInput from '../../components/SearchInput'

// Imports for the Trending Videos component
import TrendingVideos from '../../components/TrendingVideos'
import EmptyState from '../../components/EmptyState';
import { getAllVideosPost, getLatestPosts, logoutUser, searchPosts, searchUserPosts } from '../../lib/appwrite';
// Import of a useAppwrite custom hook!
import useAppwrite from '../../lib/useAppwrite';
// Import the Video card to dispaly a component of the video card with some description of the video
import VideoCard from '../../components/VideoCard';
import { router, useLocalSearchParams } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import InfoBox from '../../components/InfoBox';

// This is a copy of the Home Compoennt changed naming and other things for the Search Section when you click the magnifying glass
// to search an item, since the screen is similar to the Home, we just copied it!
const Profile = () =>
{
  // 
  // 
  // 
  // ?Need a data stateful variable for utilization of the getting all the posts from the appwrite.js fileage
  // ?It will take in an array, default is an empty array
  // const [data, setData] = useState([])
  // ?We also need an isLoading
  // const [isLoading, setIsLoading] = useState(true);
  // 
  // ?We also need a useEffect hook to perform some side code!
  // useEffect(() => 
  // {
  // ?You can return a clean up function as well. For more complex code such as event listeners, subscriptions, etc.             
  // ?component unmounts , it is removed from the DOM or if no dependencies, you can perform some CLEAN UP CODE.
  // ?When a For example if we were to add an event listener when the component mounts, we would like to remove it
  // ?before the component unmounts. If we don't it may lead to some unexpected behavior.
  // ?Call a function async in here that fetches/loads user data mostly posts actually
  //   const loadData = async () =>
  //   {
  //     setIsLoading(true);
  //     try
  //     {
  // ?Collect the data from the posts asynchronously
  //       const postsData = await getAllVideosPost();
  // ?Then set the data stateful var with that post data!
  //       setData(postsData);
  //     }
  //     catch (error)
  //     {
  // ?We can also alert the user as well like this:
  //       Alert.alert('Error', error.message);

  //     }
  //     finally
  //     {
  //      ? // In the finally regardless of the outcome the isLoading var is set to false since data load is over
  //       setIsLoading(false);
  //     }
  //   }

  //  ? // We have to do it like this because we cannot put async code wrapped in a useEffect hook like this:
  //  ? // useEffect(async ()=>{}), this would be illegal
  //  ? // 
  //  ? // Just like that we have loaded our data 
  //   loadData();
  //   return () =>
  //   {
  //   ?  // Clean up code, before the next re-render or when you unmount the component

  //   }


  // }, [])

  // See what the data is holding, by console.log() the data!
  // Pro tip for optimization, make a custom hook, utilizing the lib and copying the top into the 
  // console.log(data);

  // 
  // 
  // From the lib useAppwrite.js fileage create a variable for posts, from the stateful variables of data in 
  // Pass in the argument of searchPosts to the parameter to query and use the search algorithm to locate user's searches'
  // !
  // ?
  // This custom hook of useAppwrite is a bit advanced, but it is always good to learn tough things to help you later in life
  // The custom hook also allowed us to save ourselves from filling this home.jsx file with TONS AND TONS OF CODE!
  // Pass a query to the searchPosts function!
  // 
  // *This is the creation of the query which is used as a searcher
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  // We get the posts, reloadData function and more when we use the useAppwrite component passing in the user's id to the 
  // getUserPosts, this will allow us to get all the user's entries and will help us dispaly them!
  const { data: posts } = useAppwrite(() => searchUserPosts(user.$id));
  // 
  // 
  // 
  // 
  // Utilization of the hook useAppwrite to acquire data on latest videos
  // Rename posts to latestPosts, also no need for reloadData function!
  // const { data: latestPosts } = useAppwrite(getLatestPosts);
  // 
  // 
  // 
  // const {data: }

  // 
  // Logout function here
  const logout = async ()=>
  {
    // Call the logoutUser function to delete the current appwrite session we are in, in the baas AppWrite!
    await logoutUser();
    // Set the user to null since we termianted our session!
    setUser(null);
    // Set the isLoggedIn to false since we just logged out!
    setIsLoggedIn(false);
    // With the replace, we cannot swipe back, that is the differnet between router.push and router.replace
    // We are at the log in section yet again!
    router.replace('/signIn')

  }




  return (

    // Wrap everything in a SafeAreaView as done with the normal component in react native, the bg primary is for the background of the view
    // Adds a border for the safeareaview and h-full should fill it out, add borders to help debug positioning of react native pieces
    // border-red-300 border-2, to see how it wraps
    // 
    <SafeAreaView className="bg-gray-900 h-full ">
      {/* For the first time we will be using a self closing react native component knonw as the FlatList talked about in the crashcourse.*/}
      {/* You can pass a lot of props into the FlatList. It is utilized to render a list of elements. We are putting it to use*/}
      {/* A FlatList needs data in the form of an array. A keyExtractor which will help us get the key of the item with data. It will be
      used in a style of callback function like an example:       data={[{id: 1}]}         keyExtractor={(item)=> item.id}. In appwrite
      the item.$id will have a "$" like so...*/}
      {/* The renderItem explains to react native how we want to render that item. Make it a arrow function. With an immeidiete 
      return. We destructure the input for the arrow function to add a parameter which will be item. The data of item is now 
      destructured and renders pieces of the data.*/}
      <FlatList
        // Display the posts data instead!
        data={posts}
        // data={[]}
        // Choose data we want to render
        keyExtractor={(item) => item.$id}
        // This allows us to personalize how we want to render our data
        renderItem={({ item }) =>
        (
          // {/* That is awesome if we put item.title in there, it displays every title of our videos! */}
          // {/* We can DO SO MUCH MORE BY BUILDING A VIDEOCARD COMPONENT FOR THIS PIECE! */}
          // <Text className="text-white text-3xl">{item.title}</Text>
          // The item is passed as a prop/param to the VideoCard so that it can dispaly each item of the posts properrly
          <VideoCard 
          title={item.title}
          thumbnail={item.thumbnail}
          video={item.video}
          creator={item.creator.username}
          avatar={item.creator.avatar}
          
          ></VideoCard>



        )}
        // {/* Another useful prop is the ListHeaderComponent */}
        // This piece will be designed like as an arrow function
        // It will however return a View component
        // Forms Header Component for the list
        ListHeaderComponent={() =>
        (
          // Wrap everything in the Profile's header in a view
          // It will have classes of full width, centralize the content and items, margin top of 6, margin bottom of 12, and
          // padding left and right 4. 
          <View className="justify-center items-center mt-6 mb-12 px-4">
            {/* This will be for our sign out button! */}
            {/* The classes are of width full and items end which make the button appear at the end of the horiztonal! */}
            {/* The mb-10 makes the margin bottm of 10 to help allows the button to be in the top right */}
            {/* Later on we will have to implement a callback function fo rthe onpress prop, that logs the user out! */}
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              {/* The logout icon, below with classes of! Width and height of 6! */}
            <Image className="w-6 h-6" resizeMode="contain" source={icons.logout}></Image>
            </TouchableOpacity>
            {/* Below the TouchableOpacity we want to render the user's profile aka followers and number of vids */}
            {/* The content will be justified in the center with h and w of 16 with a border for the img */}
            {/* The centralization of the items in the View also occur! */}
            <View className="justify-center items-center h-16 w-16 border border-secondary rounded-lg">
              {/* For the img it is filled by an areas of 90% width by height of 90%, swuare! */}
              {/* Solved the error of the name img icon of their initials not rendering properly */}
              <Image source={{uri: user?.avatar || `https://cloud.appwrite.io/v1/avatars/initials?name=${user?.name}&project=669f18af003339b505ad`}} 
              className="w-[90%] h-[90%] rounded-lg " resizeMode='cover'></Image>
              
              </View>
              {/* Render a new component known as an info box, with followers, number of videos etc */}
              {/* Container styles of margin top of 5 and text is larger sized */}
              {/* This infobox is for the user's username, with user.name */}
              <InfoBox title={user?.name} containerStyles="mt-5" titleStyles="text-lg"></InfoBox>
              {/* View fo rhte followers and number of posts! */}
              <View className="mt-5 flex-row">

                {/* THis will be for the posts length, to display the number of posts the user made! It has a subtitle of
                Posts, depicting the numerb of the posts the user created.*/}
                {/* Container styles of margin right of 10 */}
                <InfoBox title={posts.length || 0} subtitle="Posts" containerStyles="mr-10" titleStyles="text-xl"></InfoBox>

                {/* THis will be for the followers count, to display the followers the user has! It has a subtitle of
                followers, depicting the numerb of the posts the user created.*/}
                <InfoBox title={"1.2k"} subtitle="Followers" titleStyles="text-xl"></InfoBox>
              </View>

          </View>

        )
        }
        // This ListEmptyComponent property allows us to create a function inside of which we can specify 
        // what will happen if our list is empty
        ListEmptyComponent={() =>
          (
            // We can do better than this, let us try making an EmptyState Component
            // It only display this when the data={[]} is set to an empty array like so<<<<
            // <Text className="text-white">Empty</Text>
            // 
            // Smarter idea is to make a component for this and get practice with that
            // Pass two properties: title and maybe subtitle, 
            // EmptyState component is now finished!
            <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video"></EmptyState>
  
          )}
      // Inside the FlatList we can render a refreshControl component in case if the user reloads and new content appears
      // Helps with reload functionality
      // The RefreshControl component requires special props to help with reload/refresh functionality, utilizing the stateful variables
      // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      >
      </FlatList>
      {/* Outside the FlatList and the view for the whole pice but still inside the SafeAreaView */}
      {/*  */}
      {/*  */}
      {/* Utilization of the StatusBar so you can see the battery percentage, clock and other
       UI/Graphics at the top of your phone */}
      {/* We are the good guys haha, we are showing them data, TikTok traps their users
       making them lose track of the very precious material, TIME, they make the style='dark !!!*/}

      <StatusBar backgroundColor='#161622' style='light'></StatusBar>



    </SafeAreaView>
  )
}

export default Profile

// ? Old Search Component
// ?
//
// When a file is in square brackets such as the one we are in right now, that means we can extract the
// value of that search out of the screen
// import { View, Text } from 'react-native'
// import React from 'react'
// import { useLocalSearchParams } from 'expo-router'
// import { SafeAreaView } from 'react-native-safe-area-context';

// const Search = () => {
//   // This is how we extract the value out of the screen from the search
//   const {query} = useLocalSearchParams();
//   return (
//     // Background will be the primary background from the constants and the horizontal will be filled
//     <SafeAreaView className="bg-primary h-full">
//       {/* The classname fo rhte view does: increasing the text size, color of the text to white,  */}
//       {/* Within the Text we can render the dynamic query */}
//       <Text className="text-3xl text-white">{query}</Text>
//     </SafeAreaView>
//   )
// }



// export default Search

