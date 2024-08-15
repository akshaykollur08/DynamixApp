// Various imports
import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
// Import for Status bar that will change color for the content in the top such as time, battery, etc for app
// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView } from 'react-native-safe-area-context'
// Imports for some constants for images
// import { images } from '../../constants'

// Imports for the SearchInput component
// import SearchInput from '../../components/SearchInput'

// Imports for the Trending Videos component
// import TrendingVideos from '../../components/TrendingVideos'
// import EmptyState from '../../components/EmptyState';
// import { getAllVideosPost } from '../../lib/appwrite';


// Create a const arrow function for the file
// The parameter for the useAppwrite function is a name called fn which is utilized as a function to fetch soemthing 
const useAppwrite = (func) => 
{
    const [data, setData] = useState([])
    // We also need an isLoading
    const [isLoading, setIsLoading] = useState(true);
    // 
    // We also need a useEffect hook to perform some side code!

      // Call a function async in here that fetches/loads user data mostly posts actually
      const loadData = async () =>
        {
          setIsLoading(true);
          try
          {
            // Collect the data from the posts asynchronously
          //   This getAllVideosPost will come from a passing of a function as a prop!
          // Call fn!
          // await fn() was replaced with await getAllVideosPost
            const postsData = await func();
            // Then set the data stateful var with that post data!
            setData(postsData);
          }
          catch (error)
          {
            // We can also alert the user as well like this:
            Alert.alert('Error', error.message);
      
          }
          finally
          {
            // In the finally regardless of the outcome the isLoading var is set to false since data load is over
            setIsLoading(false);
          }
        }

    useEffect(() => 
    {
      // You can return a clean up function as well. For more complex code such as event listeners, subscriptions, etc.             
      // component unmounts , it is removed from the DOM or if no dependencies, you can perform some CLEAN UP CODE.
      // When a For example if we were to add an event listener when the component mounts, we would like to remove it
      // before the component unmounts. If we don't it may lead to some unexpected behavior.

    
      // We have to do it like this because we cannot put async code wrapped in a useEffect hook like this:
      // useEffect(async ()=>{}), this would be illegal
      // 
      // Just like that we have loaded our data 
      loadData();
      return () =>
      {
        // Clean up code, before the next re-render or when you unmount the component
    
      }
    
    
    }, []);


// We can create another function in this useAppwrite called reloadData
// This may increase reusability, it is simply a callback function that calls the loadData one more time!
// We had to move the loadData function outside of the useEffect() to bypass any global and pointing issues
// Call the load data once at the start and another time whenever the reload function is called, and is being called on refresah! Whenever
// the user refreshes their site
const reloadData = () =>
    {   
        loadData();
    }







  // See what the data is holding, by console.log() the data!
  // Pro tip for optimization, make a custom hook, utilizing the lib and copying the top into the 
//   console.log(data);, instead of console.log() the data
// We will simply return it, destructured as an object as so as well as loading and reloadData
return {data, reloadData};




}

// Then export the function as a whole
export default useAppwrite;




