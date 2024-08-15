// Enter rnfes to get react redux snippet
// This is if you want to create a profile route with the component RootLayout
// import { StyleSheet, Text, View } from 'react-native'
import { Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black">Profile</Text>
    </View>
  )
}

export default Profile

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