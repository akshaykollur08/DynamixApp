import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { ResizeMode, Video } from 'expo-av'
import { icons } from '../../constants'
// Import everything as the DocumentPicker
import * as DocumentPicker from "expo-document-picker"
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router'


const Create = () =>
{

  // Creat ea user variable for the overall state for the user
  const {user} = useGlobalContext()

  // We also have an uploading stateful variable!
  const [uploading, setUploading] = useState(false);

  // The value for the FormField will be a stateful variable!
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ""
  })

  // This is used to collect the data that the user uploads either video or image, then upload them to your appwrite db!
  // Awesome isnt it, the connectivity is cool!
  const openSelector = async (selectType) =>
  {
    // This DocumentPicker comes from expo document picker in which we need to install it
    // const result = await DocumentPicker.getDocumentAsync      ({
    //     // If the selection type is of video/image then we attribute certain tags to those pieces
    //     type: selectType === "video"
    //       ? ['video/mp4', 'video/gif']
    //       : ['image/png', 'image/jpg', 'image/jpeg']
    //   }

    //   )

      // A cooler way is to open up the user's photo/video gallery!
      // Let us try something new!
      // This opens up the user's photo/video library!
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: selectType === 'video' ? ImagePicker.MediaTypeOptions.Videos  : ImagePicker.MediaTypeOptions.Images ,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    

    // If the result was not canceled 
    // 
    // If there was nothing/cancelation in the result then simply 
    // there is nothing there...
    // Simply put a thumbnail/video placeholder
    if (!result.canceled)
    {
      if (selectType === "image")
      {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      else if (selectType === "video")
      {
        setForm({ ...form, video: result.assets[0] });
      }
    }
    // else
    // {
    //   setTimeout(() =>
    //   {
    //     Alert.alert("Document picked!", JSON.stringify(result, null, 2))
    //   }, 100)
    // }


  }

  const post = async () => 
  {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail)
    {
      // If any of the fields are left blank then we set an Alert system to notify the user
      return Alert.alert('Please fill in all the fields');
    }
    // Apply the set to loading to be true to allow for the loading state to be in load
    setUploading(true);

    // If the post has been posted
    try
    {
      // ?Awaiting a function, createVideo, also pass in form data!
      // Pass in the user's id number!
      await createVideo({...form, userId: user.$id})

      Alert.alert("Success", "Post successfully uploaded")
      router.push('/home');
    }
    catch (error)
    {
      Alert.alert('Error', error.message)
    }
    finally
    {
      setForm
      ({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",

      })
    }
  };


  return (
    // The h-screen allowed the content to be smacked in the center of the screen, to set the height of the 
    // element to the screen size!
    // The items-center to vertically center content and justify-center used to horizontallty centralize content
    //
    // <View className="items-center justify-center h-screen">
    //   <Text className="px-4 text-center">Create screen is in development, please check back in later!</Text>
    // </View>
    // 
    // !
    // ? To get started we have to be safe, so let us use the SafeAreaView component elem
    <SafeAreaView className="bg-gray-900 h-full">
      {/* This ScrollView helps us scroll! */}
      {/* Padding in the left and right of 4 and margin in the top and bottom of 6!*/}
      {/*  */}
      {/*  */}
      {/* This automaticallyAdjustsKeyboardInsets equals true is awesome, it allows user to actively see what they are typing! */}
      {/*  */}
      <ScrollView className="px-4 my-6 " automaticallyAdjustKeyboardInsets={true}>
        {/* Render a Text element for the title of the screen! */}
        <Text className=" text-white text-center font-psemibold text-2xl">Upload Video</Text>
        {/* Under the Text we can render a FormField! */}
        {/* Props of the FormField are listed as seen below! */}
        {/* {title, value, handleChangeText, placeholder, otherStyles, ...props} */}
        <FormField title={"Video Title"} value={form.title} placeholder={"Your Catchy Video Title!"}
          //  HandlechangeText prop takes the event and then sets the form by spreading the current form out and then after adding
          // the input/event to the ongoing form pieces!
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles={"mt-10"}></FormField>
        {/* Implement another View */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Videos</Text>
          {/* In the same View do a TouchableOpacity button type thing! */}
          <TouchableOpacity className="" onPress={() => openSelector('video')}>
            {
              // If the form has a video then...
              form.video ?
                (
                  // Source of the video is set to the url of the video from the form containment
                  // Various props for the Video component such as several video sizing things, as well as a looping mechanism to 
                  // loop if
                  // the video finishes on its own! Get rid of the useNativeControls and the isLooping since they affect playback 
                  // abilities.
                  <Video source={{ uri: form.video.uri }} className="w-full h-64 rounded-2xl" 
                  // useNativeControls
                    resizeMode={ResizeMode.COVER}
                    // isLooping
                    >

                  </Video>

                )
                :
                // If we don't have any videos then we want to make an uploader view...
                // It has the classes of width of full, height of 40, paddin gin the x of 4, background color of black 100, 
                // rounded 2xl border radius, centralized content and items!
                <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center  ">
                  {/* Another View nested holding the icon forthe upload utton! */}
                  {/* THe h is 14 and the w is 14 and there exsits a border for the View as well as color orange. The content
                  and items are centralized in the view as well! */}
                  <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    {/* Width and height of the icon is set to 50% each of the view capacity holding. ResizeMode is also set
                    contain to allow for containment */}
                    <Image resizeMode="contain" className="w-1/2" source={icons.upload}></Image>
                  </View>
                </View>
            }
          </TouchableOpacity>
        </View>
        {/* Create another View here for the upload of the video thumbnail entry  */}
        {/* It has the margin of the top of 7 units and space in the y direction of 2 */}
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          {/* Copy the same TouchableOpacity like from above to below! */}
          <TouchableOpacity className="" onPress={() => openSelector('image')}>
            {
              // If the form has a THUMBNAIL! then...   
              form.thumbnail ?
                (
                  // Source of the thumbnail is set to the url of the thumbnail from the form containment
                  // Various props for the Video component such as several video sizing things. 
                  // , no need for looping mechanism sicne it is not a video!
                  // the video finishes on its own!
                  <Video source={{ uri: form.thumbnail.uri }} className="w-full h-64 rounded-2xl" useNativeControls
                    resizeMode={ResizeMode.COVER}
                  >

                  </Video>

                )
                :
                // If we don't have any thumbnails then we want to make an uploader view...
                // It has the classes of width of full, height of 16, paddin gin the x of 4, background color of black 100, 
                // rounded 2xl border radius, centralized content and items!
                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 
                border-black-200 flex-row space-x-2 mb-5">
                  {/* Another View nested holding the icon forthe upload utton! */}
                  {/* THe h is 10 and the w is 10 and there exsits a border for the View as well as color orange. The content
                  and items are centralized in the view as well! */}
                  {/* Width of 40% dashed is perfect! */}
                  <View className="w-[40%] h-12 border-dashed border border-secondary-100  justify-center items-center
                   flex-row space-x-2">
                    {/* Width and height of the icon is set to 50% each of the view capacity holding. ResizeMode is also set
                    contain to allow for containment */}
                    <Image resizeMode="contain" className="w-5 h-5" source={icons.upload}></Image>
                    {/* Under the Image */}
                    {/* Have a <Text></Text> */}
                    <Text className="text-sm text-gray-100 font-pmedium">Choose a File</Text>
                  </View>
                </View>
            }
          </TouchableOpacity>

        </View>
        {/*  */}
        {/* Here we render an AI prompt to generate an AI Video Prompt */}
        {/*  */}
        <FormField title={"AI Prompt"} value={form.prompt} placeholder={"Prompt you used to create this video"}
          //  HandlechangeText prop takes the event and then sets the form by spreading the current form out and then after adding
          // the input/event to the ongoing form pieces!
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles={"mt-7"}></FormField>
        {/* Implement another View */}
        <CustomButton title={"Submit & Post"} handlePress={post} containerStyles={"mt-7"}
          isLoading={uploading}></CustomButton>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create