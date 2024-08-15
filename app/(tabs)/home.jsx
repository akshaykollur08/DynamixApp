import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
// Import for Status bar that will change color for the content in the top such as time, battery, etc for app
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context'
// Imports for some constants for images
import { images } from '../../constants'

// Imports for the SearchInput component
import SearchInput from '../../components/SearchInput'

// Imports for the Trending Videos component
import TrendingVideos from '../../components/TrendingVideos'
import EmptyState from '../../components/EmptyState';
import { getAllVideosPost, getLatestPosts } from '../../lib/appwrite';
// Import of a useAppwrite custom hook!
import useAppwrite from '../../lib/useAppwrite';
// Import the Video card to dispaly a component of the video card with some description of the video
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';


const Home = () =>
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
  // From the useAppwrite.js fileage create a variable for posts, from the stateful variables of data in 
  // Pass in the argument of getAllVideosPost to the parameter to collect data on the user asynchronously
  // !
  // ?
  // Using the useGlobalContext to get access to use the user values!
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  // 
  // This custom hook of useAppwrite is a bit advanced, but it is always good to learn tough things to help you later in life
  // The custom hook also allowed us to save ourselves from filling this home.jsx file with TONS AND TONS OF CODE!
  const { data: posts, reloadData } = useAppwrite(getAllVideosPost);
  // 
  // Utilization of the hook useAppwrite to acquire data on latest videos
  // Rename posts to latestPosts, also no need for reloadData function!
  const {data: latestPosts} = useAppwrite(getLatestPosts);
  // 
  // 
  // 
  // const {data: }

  // 
  // 


  // 
  // Creation of a stateful variable for use in the RefreshControl system component
  const [refreshing, setRefreshing] = useState(false);
  // This asynchronous function will allow the user to swipe and hold down to refresh their screen for new content to be displayable!
  // Very incredible system
  async function onRefresh()
  {

    // Videos start appearing and rendering if this is called
    setRefreshing(true);
    // Awaits calling the reloadData function since it is inside an async function, it will reload/load data again since hte page will
    // be onrefresh
     reloadData();
    // Re call our posts/videos to see if any new videos appear, then set setRefreshing back to false
    setRefreshing(false);




  }

  // The entire function that grabs data is sent into a data variable known as posts, then is console.log() and then outputted
  // This whole portion of the useAppwrite file is made super reusable it is totally awesome man
  // ? HOwveer, instead of console.log() the data via the posts variable, let us actually render some data by displaying it in our 
  // FlatList

  return (

    // Wrap everything in a SafeAreaView as done with the normal component in react native, the bg primary is for the background of the view
    // Adds a border for the safeareaview and h-full should fill it out, add borders to help debug positioning of react native pieces
    // border-red-300 border-2, to see how it wraps
    // 
    <SafeAreaView className="bg-primary h-full ">
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
          <VideoCard title={item.title} thumbnail={item.thumbnail} video={item} creator={item.creator.username}
          avatar={item.creator.avatar}></VideoCard>
          


        )}
        // {/* Another useful prop is the ListHeaderComponent */}
        // This piece will be designed like as an arrow function
        // It will however return a View component
        // Forms Header Component for the list
        ListHeaderComponent={() =>
        (
          // Notice that it made a heading thing at the top of the Home screen we are on
          // Some styling belowo, margin y down 6px, padding in the x direction of 4px, space in the y direction of 6px
          <View className="my-6 px-4 space-y-6">
            {/* Nested in this View is another View */}
            {/* Justify between causes some natrual seperation to occur between elements! mb-6 used to be there*/}
            <View className="justify-between items-start flex-row mb-1">
              {/* Another View in this for the text pieces of greeting the user!!! */}
              <View>
                {/* A text in this: */}
                <Text className="font-pmedium text-sm text-gray-100">Welcome back, </Text>
                {/* This user.name works clearer */}
                <Text className="text-2xl font-psemibold text-white">{user?.name}</Text>
              </View>
              {/* In the ListHeaderComponent add another View */}
              {/* Within it we add an Image */}
              <View>
                {/* A width of 9px and a height of 10px and a resizeMode of containment to contain the img */}
                {/* <Image source={images.logoSmall} className="w-9 h-10 " resizeMode='contain'></Image> */}
              </View>

            </View>
            {/* Implement our search input component added int hte components section!!! */}
            {/* This SearchInput Component is a direct copy of hte FormField component with slight adjustments */}
            <SearchInput></SearchInput>
            {/* GIve some spacing underneath the SearchInput component */}
            {/*  */}
            {/*  */}
            {/*  */}
            <View className="w-full flex-1 pt-5 pb-8">
              {/* Text of LatestVideos */}
              <Text className="text-gray-100 text-lg font-pregular mb-3">Latest Videos</Text>
              {/* Create a new component called TrendingVideos Component! */}
              {/* The prop posts will be some sort of array of Objects destructured. */}
              {/* The question mark question mark tool is used for if there is none of those, then just simply create an empty array */}
              {/*  */}
              {/*  */}
              {/* This below is a horizontal List and outside and encompassing this List is a vertical list */}
              {/* That is a primary reason why outside the SafeAreaView wrapped is one FlatList instead of ScrollVIew like typically.
          That is because ScrollViews don't support vertical and horizontal scroll at the same time. In this case since we have
          a FlatList on the outside with vertical scrolling and encased somewhere is the TrendingVideos component which contains the 
          horizontal scrolling of the FlatList. */}
              {/* There exists an error in react native when you wrap everythin gin  ScrollView and you had two different FlatList types
          like vertical AND* horiztonal.  */}
          {/* NOw let us try the new latestPosts variable with all latestposts implemented */}
              <TrendingVideos posts={{latestPosts} ?? []}></TrendingVideos>

            </View>

          </View>

        )
        }
        // This ListEmptyComponent property allows us to create a function inside of which we can specify what will happen if our list is empty
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
        refreshControl={<RefreshControl tintColor={'white'} refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
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

export default Home