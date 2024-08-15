import { View, Text } from 'react-native'
import React from 'react'

const Bookmark = () => {
  return (
    // The h-screen allowed the content to be smacked in the center of the screen, to set the height of the 
    // element to the screen size!
    // The items-center to vertically center content and justify-center used to horizontallty centralize content 
    <View className="items-center justify-center h-screen">
      <Text className="px-4 text-center">Bookmark screen is in development, please check back in later!</Text>
    </View>
  )
}

export default Bookmark