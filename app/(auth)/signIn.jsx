import { View, Text, ScrollView, Image, Alert, KeyboardAvoidingView } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// ! Implement flatlist to cut the scrolling issue!


// the "../" means everything included
// 
// Imports for some constants for images
import { images } from '../../constants'
// Import for CustomButton.jsx, 
import CustomButton from '../../components/CustomButton';
// Import for the FormField Component
import FormField from '../../components/FormField';
// Import a Link from expo-router to send the user back to the sign up if they do not have a account set up with aora
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite';
// Import from Globalprovider context
import { useGlobalContext } from '../../context/GlobalProvider';


// Notice that SignIn is not a functional based component, it is a arrow functional based component
const SignIn = () => {
  // 
  // Creation of a stateful variable for the login
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  // Another stateful variable for isSubmitting
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Creates the global state vars for setting states using destructuring of Object styling
  const {setUser, setIsLoggedIn} = useGlobalContext();

  // Handles the submission of the form for signing in
  // Make it async so that it runs asynchronously and in order when it is called
  const submit = async () =>
    {
      // Now since, the createUser exists we must pass in real data!
      // We pass in and check if there is a email, password, and username available
      // ? Deletes the !form.username section since that portion does not exist in the sign in screen in the stateful variable for form
      if (form.email=="" || form.password =="")
      {
        // If either one of these is false and there is unfilled data then issue an alert
        // It is very easy in React Native to do this and is seen right below!
        Alert.alert('Error', 'Please fill in all the fields');
      }
  
      // The state of the isSubmitting stateful variable is set to true now
      setIsSubmitting(true);

  
  
      try
      {
        // Does not create a new user with the user's email and password
        // Instead of creating a new user and getting the result, we want to get the signIn function from the appwrite directory
        // The awaits signIn accepts 2 params: email and a password, until the user inputs the email and password
        await signIn(form.email, form.password);

        // gets the current result by grabbing the currentuser from the appwrite databases of users
        const currentUser = await getCurrentUser();

        // Set it to the global state...
        // This global state set remembers when the user is in when they close out of the application, similar to when Amazon you strike the
        // tab and you are still logged in, check out the context/GlobalProvider.js
        // ...^^*^*^
        // The currentUser is set as the user and the logged in stateful variable is set to true since there exists a user
        setUser(currentUser);
        setIsLoggedIn(true);


        // Then send the router to elsewhere...: ie home when you sign up!
        // Alert.alert("Hooray", "User has successfully signed in")
        router.replace('/home');
      } 
      catch (error)
      {
        Alert.alert('Error', error.message);
      }
      finally
      {
        // Set isSubmitting to false once the user is done with the submission, it resets the isSubmitting stateful variable back to its
        // original state
        setIsSubmitting(false);
      }
      
      // No need for this...
      // createUser(form.email, form.password);
  
    }
  
  
  


  return(
    <>
    <SafeAreaView className="bg-gray-900 h-full">
      {/* The KeyboardAvoidingView component from reactnative helps for when you are focussed on a form field it provides some spacing! */}
      <KeyboardAvoidingView>
      <ScrollView  automaticallyAdjustKeyboardInsets={true}>
        {/* The w-full is for filling the full width. The justify center is for centralization of the View. The min-h-[85vh] is for filling
        the viewport only to 85vh and doing that for minimum, <---This actually helps with centralization. The px is for padding to the left
        and right of 4px. The my-6 is for margin in the top and bottom of 6px. */}
        <View className="w-full justify-center px-4 my-6">
          {/* Still included in this View compoenent is the Image */}
          {/* The tailwind css classes include a width of 115px and a height of 35px for the logo img */}

          <Text className="text-4xl text-red-400 font-pbold text-center">Dynamix</Text>



          {/* <Image source={images.logoSmall} resizeMode="contain" className="w-[115px] h-[35px]"></Image> */}
          {/* The text will have a color of white, 2xl font size, font will be paragraph semibold imported from the assets utilizing the aid
          of the constants directory. The class for the log in text will also be semibold style */}
          <View className="flex-row mt-5 mb-5">
          <Text className='text-white text-2xl font-psemibold'>Log in</Text>
          {/* <Text className='text-red-400 text-2xl font-extrabold'>Dynamix</Text> */}

          </View>
          
          {/* We now need a custom input field for the form! */}
          {/* Render our first FormField Component */}
          {/* Additionally passage of props needs to occur */}
          {/* It will have the title prop of the email */}
          {/* It will have the value prop of the email address, from the Object of hte stateful variable */}
          {/* When the text is being changed, the destructuring will change with the event and the email will change correspondingly. */}
          {/* The otherStyles prop will have the data of margin from the top of 7px */}
          {/* The keyboardType will have emailAddress which will help with the data of email addresses being filled out automatically*/}
          <FormField 
          title="Email" 
          value={form.email} 
          handleChangeText={(e)=>setForm({...form, email: e})}
          otherStyles="mt-7"
          keyboardType="emailAddress"
          >
          </FormField>
          {/* Very similar FormField component below but it represents the password field! */}
          {/* We do not need the keyboardType because passwords should be protected and unknown for every user */}
          <FormField 
          title="Password" 
          value={form.password} 
          handleChangeText={(e)=>setForm({...form, password: e})}
          otherStyles="mt-7"
          >
          </FormField>
          {/* We add our CustomButton Component for signing in */}
          {/* Title is "Sign In" */}
          {/* handlePress property is an arrow function for the submission of the log in form */}
          {/* Some container styles for taking up the full width and margin top of 7px */}

          <CustomButton
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-7"></CustomButton>

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">Don't have account?</Text>
              <Link href="/signUp" className='text-lg font-psemibold text-red-400'>Sign Up</Link>
            </View>


        </View>





      </ScrollView>
      </KeyboardAvoidingView>
          

      </SafeAreaView>
    </>
    
    
  )
}

export default SignIn