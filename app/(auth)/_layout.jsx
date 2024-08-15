import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
// Import a special StatusBar from a different location more importantly and efficently
// The one from expo-status-bar


// Auth screens don't have footer navbar that is why we created another _layout.jsx in the (auth) 
// folder for routes/screens
const AuthLayout = () => {
  return (
    <>
    <Stack>
      {/* A Stack within a Stack for the signIn */}
      <Stack.Screen name='signIn' options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='signUp' options={{headerShown: false}}></Stack.Screen>
      </Stack>

      {/* We use the StatusBar from the expo-status-bar because  */}
      <StatusBar backgroundColor='#161622' style='light'></StatusBar>


    </>
  )
}

export default AuthLayout