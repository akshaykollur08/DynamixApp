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
import { getAllVideosPost, getLatestPosts, searchPosts } from '../../lib/appwrite';
// Import of a useAppwrite custom hook!
import useAppwrite from '../../lib/useAppwrite';
// Import the Video card to dispaly a component of the video card with some description of the video
import VideoCard from '../../components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

// This is a copy of the Home Compoennt changed naming and other things for the Search Section when you click the magnifying glass
// to search an item, since the screen is similar to the Home, we just copied it!
const Search = () =>
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
  const { query } = useLocalSearchParams();
  // We get the query then we use the useAppwrite hook to make a call to the searchPosts with the query and we get the posts, 
  // We use the arrow function to get around the null pointer issue with the Objectification of the func  function!
  const { data: posts, reloadData } = useAppwrite(()=>searchPosts(query));
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
  // 


  // 
  // 
  // ?Instead of doing this onRefresh with swipe and holding the screen down we can use a simple useEffect
  // Creation of a stateful variable for use in the RefreshControl system component
  // const [refreshing, setRefreshing] = useState(false);
  // This asynchronous function will allow the user to swipe and hold down to refresh their screen for new content to be displayable!
  // Very incredible system
  // async function onRefresh()
  // {

    // Videos start appearing and rendering if this is called
  //   setRefreshing(true);
    // Awaits calling the reloadData function since it is inside an async function, it will reload/load data again since hte page will
    // be onrefresh
  //   reloadData();
    // Re call our posts/videos to see if any new videos appear, then set setRefreshing back to false
  //   setRefreshing(false);
  // }
  // UseEffect for when something is re-rendered
  useEffect(()=>
  {
    // Eevery time the user types something new, a reloadData function will run!
    reloadData()

  }, [query])

  // The entire function that grabs data is sent into a data variable known as posts, then is console.log() and then outputted
  // This whole portion of the useAppwrite file is made super reusable it is totally awesome man
  // ? HOwveer, instead of console.log() the data via the posts variable, let us actually render some data by displaying it in our 
  // FlatList
  // console.log(posts);

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
          <VideoCard video={item}></VideoCard>



        )}
        // {/* Another useful prop is the ListHeaderComponent */}
        // This piece will be designed like as an arrow function
        // It will however return a View component
        // Forms Header Component for the list
        ListHeaderComponent={() =>
        (
          // Notice that it made a heading thing at the top of the Home screen we are on
          // Some styling belowo, margin y down 6px, padding in the x direction of 4px, space in the y direction of 6px
          // No spacing there!
          <View className="my-6 px-4">
            {/* Nested in this View is another View */}
            {/* Justify between causes some natrual seperation to occur between elements! mb-6 used to be there*/}
              {/* Another View in this for the text pieces of greeting the user!!! */}
                {/* A text in this: */}
                <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
                {/* Display the query undernearht the Search results text! Basicallt the user's input is displayed! */}
                <Text className="text-2xl font-psemibold text-white">{query}</Text>

                {/* A View component that will create spacing, below with classes of margin top of 6, margin bottom fo 8  */}
                {/* Holds our searchinput! */}
                <View className="mt-6 mb-8">

                <SearchInput initialQuery={query}></SearchInput>

                </View>
                
            {/* Implement our search input component added int hte components section!!! */}
            {/* This SearchInput Component is a direct copy of hte FormField component with slight adjustments */}
            {/* GIve some spacing underneath the SearchInput component */}
            {/*  */}
            {/*  */}
            {/*  */}
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
          <EmptyState title={`No Results found for "${query}"`} subtitle="Check your spelling, or try different keywords"></EmptyState>

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

export default Search

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

