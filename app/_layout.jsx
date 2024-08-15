// Like our main file or starting point for our app
//! CHANGE APP NAME TO DYNAMIX 
import { StyleSheet, Text, View } from 'react-native'
// useEffect dependency has been added
import  React, {useEffect} from 'react'
// Think of Slot as the children prop in React JS
import {Slot, Stack, SplashScreen} from 'expo-router'
// Import the useFonts from expo-font, like a react hook!
import {useFonts} from "expo-font"
import GlobalProvider from '../context/GlobalProvider'

// Import the GlobalProvider component

// 
// 
// Add a special directive for SplashScreen called preventAutoHideAsync()
// This allows the SplashScreen from auto hiding before asset loading has been completed
// Helps prevent annoying load bugs
SplashScreen.preventAutoHideAsync();

// Notice that React native is not using the classic functional based components as JS does

const RootLayout = () => {
  // To use the fonts do this, similar to a creation of a stateful variable
  const[fontsLoaded, error] = useFonts(
    {
      // How you do it is by passing in an Object of all the fonts you want to use.
      // Load all fonts!
      // 1. Give it a string where you specific the name of the font.
      // 2. require the link to where that font is saved
      // 3. Repeat for all fonts
      // All fonts have been loaded
      "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
      "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
      "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
      "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
      "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
      "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
      "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
      "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
      "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    })

    useEffect(()=> 
      {
        if(error)
        {
          throw error;
        }

        // If fonts have been loaded we want to throw something called a SplashScreen.
        if(fontsLoaded)
        {
          // The hideAsync() method hides the native async immeidnetyl
          SplashScreen.hideAsync();
        }

          
          // You can return a clean up function as well. For more complex code such as event listeners, subscriptions, etc.             // component unmounts , it is removed from the DOM or if no dependencies, you can perform some CLEAN UP CODE.
          // When a For example if we were to add an event listener when the component mounts, we would like to remove it
          // before the component unmounts. If we don't it may lead to some unexpected behavior.
          return() =>
              {
                  // Clean up code, before the next re-render or when you unmount the component

              }
      }, [fontsLoaded, error])
      // If for some reason fonts have not been loaded
      // If something went wrong
      if(!fontsLoaded && !error)
      {
        return null;
      }


  return (
    // Without slot we need styling and all this hunk
    /**
     * <View style={styles.container}>
     * <Text>RootLayout</Text>
     * </View>
     */


    // Slot component saves lots of time with centralization and easy component usage
    // React N components save time so you can spend it elsewhere
    <>
    {/* An error occurs if your text strings are not rendered in Text <><> tags */}
    {/* All wraps need to occur since it only allows HTML + JS Combine */}
    {/*  */}
    {/*  */}
    {/*Instead of doing ANYTHING HERE BELOW */}
     {/* <Text>Header</Text> 
    <Slot></Slot>
    <Text>Footer</Text>  */}
    {/* We can just return a Stack */}
    {/* As seen here below */}
    {/*  NEW ADDITION */}
    {/*  */}
    {/*  */}
    {/* WRAP THE STACK INSIDE THE GLOBALPROVIDER COMPONENT TO HELP WITH OVERALL GLOBAL STATE OF SYSTEM*/}
    {/* Now all the screens will have access to the data within the values */}
    <GlobalProvider>
    <Stack>

      {/* Now we can see our index screen */}
      <Stack.Screen name='index' options={{headerShown: false}}></Stack.Screen>

      {/* Now we can see our sign in page */}
      <Stack.Screen name='(auth)' options={{headerShown: false}}></Stack.Screen>

      {/* Now we can see our tabs page */}
      <Stack.Screen name='(tabs)' options={{headerShown: false}}></Stack.Screen>
      {/*  */}
      {/* Now we can see our search tab without hte measly headdr page */}
      <Stack.Screen name='search/[query]' options={{headerShown: false}}></Stack.Screen>
    </Stack>
    </GlobalProvider>
    
    </>
    
  )
  
  
  
}

export default RootLayout

const styles = StyleSheet.create({
    // For stylesheets and styling for components in React Native
    // Creation of the container class
    // container:
    // {
    //     display: "flex",
    //        Advanced flexbox, flex: 1, basically does this.
        // flex-grow: 1; flex-shrink: 1; flex-basis: 1
        // This element should grow and shrink with the size of the web browser
    //     flex: 1,
        // Centralizes in the center of the horizontal way
    //     alignItems: "center",
        // Aligns it in the center vertically in the center of screen
    //     justifyContent: "center",
    // }



    



})