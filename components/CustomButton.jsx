// Creation of a CustomButton component in JSX to be used in index.jsx
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

{/* <CustomButton 
title="Continue with Email" 
onPress={()=>{}}
containerStyles="w-full mt-7"></CustomButton> */}
// We have destructured parameters of title, handlePress, containerStyling, textStyling and an isLoading variable
// For the display of a loading img just in case
const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity className={`bg-red-400 rounded-xl min-h-[62px] justify-center items-center 
      ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading} 
      onPress={handlePress} 
      activeOpacity={0.7}
      >
        {/* This is not technically a button, it is a touchable opacity, and use what we learned. It is a advanced
        button that is epic! */}
      <Text className={`text-primary font-psemibold ${textStyles} text-lg`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton