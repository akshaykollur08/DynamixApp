// This index.jsx file is our onboarding page or a /route a route
// index.jsx will COMPLETELY function as our onboarding screen HOME PAGE FOR AORA
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image } from 'react-native';
// If we want to link something for the profile.jsx
import { Link, Redirect, router } from 'expo-router';
// Utilization for navigation between screens
import { NavigationContainer } from '@react-navigation/native';

import React, { useState, useEffect } from "react";
// import for the SafeAreaView
import { SafeAreaView } from 'react-native-safe-area-context';
// Import for react-native-url-polyfill
import 'react-native-url-polyfill/auto'

// Imports for some constants for images
import { images } from '../constants'
// Import for CustomButton.jsx
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';





export default function App()
{
  // Set up our GlobalProvider context vars using destructing of two stateful Object vars
  const {isLoading, isLoggedIn} = useGlobalContext();

  // If the app is not loading and the user is already logged in they are redirected to the home page rather than the seeing the onboarding 
  // screen which is the index.jsx file
  if(!isLoading && isLoggedIn)
  {
    return <Redirect href="/home"></Redirect>
  }



  return(

    //  {/* <View className="flex-1 items-center justify-center bg-black"> */}
    //         /* <Text className="text-3xl text-blue-500 font-pblack">Aora!</Text> */}
    //       {/* <StatusBar style="auto" /> */}
    //       {/* Crazy that there is now a link on our page! */}
    //       {/* <Link href="/home" className='text-blue-500'>Go To Menu</Link> */}
    //     {/* </View> */}

    // Let's try something new  
    <SafeAreaView className="bg-gray-900 h-full">
      {/* 100% means whole screen is scrollable and it is useful for devices with different sizes.
      People might need to scroll down to see content displayed on the screen */}
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        {/* w-full is a NativeWind TailWind CSS property for width 100%. justify-center and item-center work
        together to centralize in the middle of the screen. h-full is used for full height. Instead we
        will use h-[85vh]. The vh will help us center content in the center of the screen and
        helps with horizontal viewport.  We also need a min height. padding x-4 is used for
        padding to help centralize in the middle again.*/}
        <View className="w-full justify-center items-center min-h-[85vh]  px-4">
          {/* importation of the images.logo img */}
          {/* Width of the logo is 130px and the height is 84px */}
          {/* Get rid of the aora log and replace */}
          {/* Add text piece */}
          <View className='flex-row items-start justify-center'>
          <Text className="text-4xl text-red-400 font-pbold text-center">Dynamix</Text>
          <Image source={images.logoSmall} className='w-8 h-8' resizeMode='contain'></Image>
          </View>

          {/* <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode='contain'></Image> */}
          {/*  */}
          {/* Another image for the dog and person, the "cards" img */}
          {/* The resizeMode="contain" allows the piece to be properly placed inside the containment */}
          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode='contain'></Image>
           {/* Add a top text piece */}
           {/*  */}
          {/* Still within the current View, add another View with the text and other components and goods */}
          {/* It is given a display of relative and a margin from the top of 5px */}
          <View className="relative mt-5">
            {/* The Text is in size 3xl and white color text */}
            <Text className="text-2xl text-white font-pbold text-center">Discover Endless Possibilities with {' '}
              {/* A special color within our tailwind css is below, text-secondary-200 from tailwind.config.js file */}
              <Text className="font-extrabold text-red-400 ">Dynamix</Text>
            </Text>
            {/* After the textuals but still in the same view of the textuals, add some images for tags */}
            {/* Like a bold underline for the Aora text! */}
            {/* <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode='contain'> */}
            {/* </Image> */}

          </View>
          {/* Outside of the textuals and outside the view of the textuals, have some new text */}
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless discovery</Text>
          {/* First custom component! called CustomButton using the Touchable Opacity property! */}
          {/* Passage of some properties such as title, handlePress which will be a callback function 
            (NOT HANDLECLICK, NOTICE THAT), As well as some containerStyles that have property currently set to
            width full and margin top of 7px */}
          <CustomButton
            title="Continue with Email"
            handlePress={()=> router.push('/signIn')}
            containerStyles="w-full mt-7">

            </CustomButton>


        </View>

        {/* Rough notes, ignore this bottom thing, not too important */}
        {/* <View className="flex-1 items-center justify-center bg-primary">
          <Link href="/signIn" className='text-blue-500'>Go To Sign In</Link>
        </View> */}


      </ScrollView>
      {/* Outside the ScrollView and the view for the whole pice but still inside the SafeAreaView */}
      {/*  */}
      {/*  */}
      {/* Utilization of the StatusBar so you can see the battery percentage, clock and other
       UI/Graphics at the top of your phone */}
      {/* We are the good guys haha, we are showing them data, TikTok traps their users
       making them lose track of the very precious material, TIME, they make the style='dark !!!*/}
      <StatusBar backgroundColor='#161622' style='light'></StatusBar>





    </SafeAreaView>


  );
}

// Do not need since we are importing the NativeWind TailWind CSS library and pieces
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });




