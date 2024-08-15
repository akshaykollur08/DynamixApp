// Run another rnfe for the tabsLayout
// This folder portion is for the creation of the footer navbar type thing
// Important imports for the react native are imported in
import { View, Text, Image } from 'react-native'
import React from 'react'
// import Tabs and Redirect feature into the TabsLayout master file component
// The Tabs will help us with a navbar footer type layout!
import {Tabs, Redirect} from "expo-router"
// 
// Import the icons from the assets folder using the aid of the constants directories help
import {icons} from '../../constants'

// Destructure the passing parameters for your icons const arrow functional component
// Some parameters for the TabIcon arrow function are icon, color, name, and focused state of that tab icon
const TabIcon = ({icon, color, name, focused}) =>
{
    return(
        // The items-center and justify-center centralizes the home tab icon
        <View className="items-center justify-center gap-1">
            {/* resizeMode helps resize the large size of the home icons and the other ones */}
            {/* The tint color also helps balance the shading of the hsla */}
            {/* The NativeWind w-6 h-6 helps resize the height and width of the home icon  */}
            <Image source={icon} resizeMode='contain' tintColor={color} className="w-6 h-6"></Image>
            {/* Right under the img which is the icon img, we will render the name of the icon, aka home, etc 
            .This saves efficiency and redundancy and applies repeatability.*/}
            {/* If it is on that set tab, the text is bolded if not it is regular font */}
            <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`} style={{color: color}}>{name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
    {/* // <View>
    //   <Text>TabsLayout</Text>
    // </View> */}
    {/*  */}
    {/*  */}
    {/*  */}
    {/* Pass additional screenOptions because we want more than just home display and we want just one "home" 
    text display */}
    {/* screenOptions is set to an Object that only display our specific label we chose */}
    <Tabs screenOptions=
    {{
        tabBarShowLabel: false,
        // These colors below match the aora color themes
        tabBarActiveTintColor: "#F87171",
        tabBarInactiveTintColor: "#cdcde0",
        // Styling for the tab bar
        tabBarStyle: 
        {
            // Primary color for aora app
            // Background color for the tab bar
           backgroundColor: "#111827",
        //    border width is 1px
           borderTopWidth: 1,
        //    thematic color for the tab bar
           borderTopColor: "#111827",
        //    height is 84 px
           height: 84,
        }
    }}>
        {/* The first tab is the home tab then from there they are the exact files we have created! */}
        {/* That's fricking awesome man */}
        <Tabs.Screen name='home' options=
        {
            {
                title: "Home",
                headerShown: false,
                tabBarIcon: ({color, focused})=>(
                    // This is for the return of a TabIcon tag, pass some properties
                    // icons.home gets the piece from the constants and icons.js folder, color 
                    // which calls the callback for color
                    // and name which is just simply "Home"
                    // focussed also calls a callback to focussed

                    <TabIcon icon={icons.home} color={color} name="Home" focused={focused}></TabIcon>

                )


            }
        }>
        </Tabs.Screen>


        {/* Second Tab.Screen for bookmark tab */}
        {/* <Tabs.Screen name='bookmark' options=
        {
            {
                title: "Bookmark",
                headerShown: false,
                tabBarIcon: ({color, focused})=>(
                    // This is for the return of a tab icon, pass some properties
                    // icons.bookmark gets the piece from the constants and icons.js folder, color 
                    // which calls the callback for color
                    // and name which is just simply "Bookmark"
                    // focussed also calls a callback to focussed

                    <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}> 

                    </TabIcon>

                )


            }
        }></Tabs.Screen> */}

        {/* Third Tab.Screen for create tab */}
        {/* Allowing the user to create their projects */}
        <Tabs.Screen name='create' options=
                {
                    {
                        title: "Create",
                        headerShown: false,
                        tabBarIcon: ({color, focused})=>(
                            // This is for the return of a tab icon, pass some properties
                            // icons.create gets the piece from the constants and icons.js folder, color 
                            // which calls the callback for color
                            // and name which is just simply "Create"
                            // focussed also calls a callback to focussed
                            // Different icon, not icons.create, it is icons.plus

                            <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}> 

                            </TabIcon>

                        )


                    }
                }>

                </Tabs.Screen>

                {/* Fourth Tab.Screen for profile tab */}
                {/* For the user's profile's tab */}
                <Tabs.Screen name='profile' options=
                        {
                            {
                                title: "Profile",
                                headerShown: false,
                                tabBarIcon: ({color, focused})=>(
                                    // This is for the return of a tab icon, pass some properties
                                    // icons.profile gets the piece from the constants and icons.js folder, color 
                                    // which calls the callback for color
                                    // and name which is just simply "Profile"
                                    // focussed also calls a callback to focussed

                                    <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}> 

                                    </TabIcon>

                                )


                            }
                        }>
                    </Tabs.Screen>    


    </Tabs>
    </>
  )
}

export default TabsLayout