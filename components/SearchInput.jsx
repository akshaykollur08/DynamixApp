import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from "react"
// We want some icons for eye and visibility for password ans such so we will import them
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';


{/* <SearchInput 
title="Password" 
value={form.password} 
handleChangeText={(e)=>setForm({...form, password: e})}
otherStyles="mt-7"
>

</SearchInput> */}

// Acceptance of all the props such as above and then other ones using the ...props and spreads the data
const SearchInput = ({ initialQuery }) =>
{
  // No longer needs this password
  // const [showPassword, setShowPassword] = useState(false);
  // We can get access to the pathName, aka what screen we are currently on
  const pathName = usePathname();
  // Now we serte a stateful variable of query, initally set to whatever the user inputted, if there is nothing there 
  // then an empty string!
  const [query, setQuery] = useState(initialQuery || "");

  const searchSubmission = () => 
  {
    // If the query does not exist then we reutnr an Alert from react 
    if (!query)
    {
      // Alerts/Error messages have a title, message
      return Alert.alert("Missing query", "Please input something to search results across database");

    }
    // If the pathName starts with the char, '/search'
    if (pathName.startsWith('/search'))
    {
      router.setParams({ query });
    }
    else
    {
      router.push(`/search/${query}`)
    }

  }


  return (
    // No Need for this VIew, we jsut need one view and the input within it, since we do not need to space it like the login formfield
    // Component
    // <View className="space-y-2">
    //   <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
    // 
    // 
    //   {/* Creation of the View Component that holds the input section */}
    //   {/* The View for the email and password section have classes. They are for the background color of a shade of black. Border of
    //   2px, border color of red-500. It is also full width and height of 16 px. It also has a padding of px-4 which is padding-left of 
    // 4px as well as padding-right of 4px  */}
    //   {/* The rounded-2xl class adds some border-radius and rounding to the input! */}
    //   {/* focus allows for when you are on the ui and active with it, ie, click it to start typing */}
    //   {/* The items are centralized in the center of the top and bottom of the input box.*/}
    //   {/* They are also in a flexed row format. This allows the pieces to move from left to right and have the eye be on the far right. 
    //   Instead of a flexed column style. */}
    // We can add some space the end of the View to space out the search bar
    <View className=" bg-black-100 border-2 border-black-200 w-full h-16 px-4 rounded-2xl 
      focus:border-red-400 items-center flex-row space-x-4">
      {/* For the input it has the CSS classes of flex-1 which is an advanced flexbox css concept. It  */}
      {/* Advanced flexbox, flex: 1, basically does this.
  flex-grow: 1; flex-shrink: 1; flex-basis: 1
  This element should grow and shrink with the size of the web browser*/}
      {/* It also has the text color of white, font style of paragraph semibold, and a text-base, sets the text size to the base size.*/}
      {/* The placeholder is set to the object value of the prop passed through to the arrow functional component of the SearchInput */}
      {/* The value is set to the object value of the prop passed through to the arrow functional component of the SearchInput */}
      {/* The onChangeText property is set to the object value of the prop passed through to the arrow functional component of the 
        SearchInput. It will also use the useState for a stateful variable and function to help change the text in live time. */}
      {/* The secureTextEntry property will also be utilized to help for when the user enters a password it is hidden using the 
        "*" character. If the title is equal to "Password" and it is not showPassword<--has initial state of false. Then the 
        text entry will be SECURE! If either is false for safety purposes, then it will not secure the entry and will just display chars.*/}
      {/* The type will be of type="text". */}
      {/*  */}
      {/*  */}
      {/* Change up the textuals for the TExtInput compoennt for the SearchBar Input compoennt. Addition*:0.5px of margin top */}
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        placeholder="Search for a video topic"
        // value={value}, change value to the query var
        value={query}
        // This color pops out a bit more!
        placeholderTextColor="#CDCDE0"
        // In the event someone changes the text, the query will be set to that passing event
        onChangeText={(e) => setQuery(e)}
        // secureTextEntry={title==="Password" && !showPassword}
        // We no longer need the securetextEntry since it is not protecting crazy high data

        // Cool search thingy to show blue colored submission button
        enterKeyHint="search"
      // Allows the submitting to call for the searchSubmission arrow function
      onSubmitEditing={searchSubmission}
      />

      {/* NOw here is where things change for the SearchInput bar, instead of rendering a title in the  */}
      {/*  */}
      {/* {title==="Password" && 
      (
        // Remember the TouchableOpacity is very similar to a button in JS and React JS
        // When clicked the TouchableOpacity will call a callback function to setShowPassword to the other state of the showPassword 
        // var
        // using the ! operator
        // When it is clicked it is a toggle for either the open eye or slashed eye. The class is that its width and height are 6px.
        // The TouchableOpacity is also resized with contain
        // When it is clicked, the password is revealed if it is hidden and hidden if it is shown with full characters
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'></Image>

        </TouchableOpacity>
      )} */}
      {/*  */}
      {/*  */}
      {/* We will render another TouchableOpacity button type element */}
      {/* The TouchableOpacity for the serch image will have some onpress prop att for a callback function to something else */}
      <TouchableOpacity onPress={searchSubmission}

      >
        {/* In it we render an image */}
        {/* The source is the search bar icon, className is width of 9px and height of 10px
        , the resizeMode is contain so it is viewable */}
        <Image source={icons.search} className="w-9 h-10" resizeMode='contain'></Image>
      </TouchableOpacity>

    </View>


    // </View>
  )
}

export default SearchInput