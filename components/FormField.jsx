import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from "react"
// We want some icons for eye and visibility for password ans such so we will import them
import { icons } from '../constants';


{/* <FormField 
title="Password" 
value={form.password} 
handleChangeText={(e)=>setForm({...form, password: e})}
otherStyles="mt-7"
>

</FormField> */}

// Acceptance of all the props such as above and then other ones using the ...props and spreads the data
const FormField = ({title, value, handleChangeText, placeholder, otherStyles, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="space-y-2">
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      {/* Creation of the View Component that holds the input section */}
      {/* The View for the email and password section have classes. They are for the background color of a shade of black. Border of
      2px, border color of red-500. It is also full width and height of 16 px. It also has a padding of px-4 which is padding-left of 4px
      as well as padding-right of 4px  */}
      {/* The rounded-2xl class adds some border-radius and rounding to the input! */}
      {/* focus allows for when you are on the ui and active with it, ie, click it to start typing */}
      {/* The items are centralized in the center of the top and bottom of the input box.*/}
      {/* They are also in a flexed row format. Thisallows the pieces to move from left to right and have the eye be on the far right. 
      Instead of a flexed column style. */}
      <View className=" bg-black-100 border-2 border-black-200 w-full h-16 px-4 rounded-2xl 
      focus:border-red-400 items-center flex-row ">
        {/* For the input it has the CSS classes of flex-1 which is an advanced flexbox css concept. It  */}
        {/* Advanced flexbox, flex: 1, basically does this.
  flex-grow: 1; flex-shrink: 1; flex-basis: 1
  This element should grow and shrink with the size of the web browser*/}
        {/* It also has the text color of white, font style of paragraph semibold, and a text-base, sets the text size to the base size.*/}
        {/* The placeholder is set to the object value of the prop passed through to the arrow functional component of the FormField */}
        {/* The value is set to the object value of the prop passed through to the arrow functional component of the FormField */}
        {/* The onChangeText property is set to the object value of the prop passed through to the arrow functional component of the 
        FormField. It will also use the useState for a stateful variable and function to help change the text in live time. */}
        {/* The secureTextEntry property will also be utilized to help for when the user enters a password it is hidden using the 
        "*" character. If the title is equal to "Password" and it is not showPassword<--has initial state of false. Then the 
        text entry will be SECURE! If either is false for safety purposes, then it will not secure the entry and will just display chars.*/}
        {/* The type will be of type="text". */}
        
      <TextInput 
      className="flex-1 text-white font-psemibold text-base placeholder-italic"  
      placeholder={placeholder}
      value={value}
      placeholderTextColor="#7b7b8b"
      onChangeText={handleChangeText}
      secureTextEntry={title==="Password" && !showPassword}
      type="text"/>

      {title==="Password" && 
      (
        // Remember the TouchableOpacity is very similar to a button in JS and React JS
        // When clicked the TouchableOpacity will call a callback function to setShowPassword to the other state of the showPassword var
        // using the ! operator
        // When it is clicked it is a toggle for either the open eye or slashed eye. The class is that its width and height are 6px.
        // The TouchableOpacity is also resized with contain
        // When it is clicked, the password is revealed if it is hidden and hidden if it is shown with full characters
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'></Image>

        </TouchableOpacity>
      )}

      </View>
      

    </View>
  )
}

export default FormField