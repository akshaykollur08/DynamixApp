import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import { router } from 'expo-router'
import CustomButton from './CustomButton'

// Destructure the properties for EmptyState of title and subtitle as so... they can be traversed
const EmptyState = ({title, subtitle}) => {
  return (
    // The jusitification of the view is in the center, items encased in it are also centered, padding in the x is 4px to pump it out a lil
    <View className="justify-center items-center px-4">
        {/* Import the images from the constants and empty img  */}
        <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode='contain'></Image>
        {/* Add some text element for clearness for the user */}
        <Text className="font-psemibold text-xl text-white text-center">{title}</Text>
        {/* Addition of a margin top of 2px to seperate the subtitle from the title */}
        <Text className="text-sm text-center font-pmedium mt-2 text-gray-100">{subtitle}</Text>
        {/* Add a CustomButton component for versatility */}
        {/* Also pass some props */}
        {/*           <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-7"></CustomButton>
         */}
         {/* The CUSTOMBUTTON IS FINISHED */}
        <CustomButton
        title="Create Video"
        handlePress={()=>router.push('/create')}
        containerStyles={"w-full my-5"}
        ></CustomButton>
        {/* EmptyState Component is built! */}
    </View>
  )
}

export default EmptyState