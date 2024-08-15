import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { icons } from '../constants'
// Import icons
// Import video and resizemode from expo-av
import {Video, ResizeMode} from 'expo-av'


// Destrcuture data from the parameters of the VideoCard compoentn, such as video, and specifically desctruture the video's
//  title, thumbnail, video link, creator, etc
const VideoCard = ({title, thumbnail, video, creator, avatar} ) => {
    // We want to create some new stateful variables to check if the video is in play mode or not playing
    // Initially the video is not playin!
    const [playing, setPlaying] = useState(false);
    // 


  return (
    // Flex-col allows the pieces of the list, aka every video to be one on top of one another
    // VArious other styling like the paddin gin the x of 4 and margin bottom of 14 for phone, now its mb-10!
    <View className="flex-col items-center px-4 mb-10">
        {/* Creation of another View piece in the View. Items will start and there is a gap of 0.75rem or 12px and a flex-row styling
        The items will be row by row, left to right*/}
        <View className="flex-row gap-3 items-start">
            {/* Another View wrapped inside. Styling explained: items and content is justified to the center. Flex style is in the row
            left to right, flex of 1, does an advanced flexbox of flex: 1 1 which basically allows the content by growing and shrinking
            based off the size of the display device. */}
            <View className="justify-center items-center flex-row flex-1">
                {/* Final last View wrapped inside, with style of width and height of 46px. The rounded edges with border-radius
                of 8px of the view, border and border with seconadary color. The items and content are centralized. 
                There is also padding of 0.5. w-[46px] h-[46px] rounded-lg 
                border-secondary justifiy-center items-center p-0.5
                 */}
                <View className="w-[46px] h-[46px] rounded-lg border border-red-400 justify-center items-center p-0.5">
                    {/* Within it we can render an Image */}
                    {/* uri is the avatar, className is height and width of full, rounded border radius,resize mode is contain
                    to fit the content fully! */}
                    {/* NOw it shoes the avatar's initials, for me it is A, since akshay starts with an "A".  */}
                    <Image source={{uri: avatar}} className="w-full h-full rounded-lg " resizeMode='cover'></Image>
                </View>
                {/* Another VIew inside this View, that will have classname with tailwind css pieces that:
                justifies the content to be in the center, no justification for items to be in the center, flex-1 which renders to
                grow and shrink with resolution, ml-3 for margin left of 3px, and gap-y-3 for gap in the y of 3px */}
                {/*  */}
                {/*   Advanced flexbox, flex: 1, basically does this.
                flex-grow: 1; flex-shrink: 1; flex-basis: 1
                This element should grow and shrink with the size of the web browser
                flex: 1; The gap-y-1 does the spacing between the title and the username in our setup, between children of this View*/}
                <View className="justify-center items-start flex-1 ml-3 gap-y-1">
                {/* Render a text element for the title */}
                {/* With the classes of text color white, font-semibolded from the help of the constants folder. text is also smaller 
                */}
                {/* Also add another speical property to this text called numberOfLines! */}
                {/* The numberOfLines stops the text from going further if it is longer than 1 line! */}
                <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                {/* Textual for the creator! */}
                <Text className="text-red-400 font-psregular text-xs" numberOfLines={1}>{creator}</Text>

                </View>
            </View>
            {/* Create another View here */}
            {/* Its classname does this:  padding top of 2, the content and items are also centralized properly!*/}
            <View className="pt-2 items-center justify-center">
                {/* The menu icon classes are described with the width and height of 5 or 20px, and resizing is of containment! */}
                <Image source={icons.menu} className="w-5 h-5 mr-2" resizeMode='contain'></Image>

            </View>
        </View>
        {/* The text of the Text element is white and it is in the size of 2xl which is 1.5rem or 24px */}
        {/* Get rid of this non formatted not nice looking Text element */}
      {/* <Text className="text-2xl text-white">{title}</Text> */}
      {/* <Image source={}></Image> */}
    {/* New dynamic block of code to check if the video is playing or not, */}
    {playing ? 
    (
         // Video component has the suorce of the from the VideoCard parameter's video link, the classes 
        //  are of width of full width and height of 60, 
          // border radius: rounded of 12 px or 0.75rem <--more curvy, the margin top of 3, 
        //   and background of white in a shade of 10  bg-white/10, <-- do not need in our case!
          // resize ode of special compoentn of the ResizeMode of the CONTAIN
          <Video source={{uri: video}} className="w-full h-60 rounded-xl mt-3" resizeMode={ResizeMode.CONTAIN}
          // Allows the user to use natively controls to their device
          useNativeControls
          isLooping
          // Device plays immeideitly on click!
          shouldPlay
          onPlaybackStatusUpdate={(status)=>
          {
            // If the video jsut finished, we play it back
            if(status.didJustFinish)
            {
              // Playing is set to false if the video jsut finished!
              setPlaying(false);
            }
          }
        }
          onError={(error)=>
          {
            console.log('Error loading video:', error);
          }
          }
          ></Video>
        // <Text className="text-white">Playing</Text>
        // If the stateful variable of playing is false/video is not playing then a TouchableOpacity button type thing is returned
    ):
    // TouchableOpactiy will have classes that have width and h-60 for the height, rounded-xl for thicker border-radius and more curvy edges
    // , margin top of 3, and justification of content in the center and items centralized 
    // 
    // ActiveOpacity is also 0.7 so that it is somewhat see throughable when we are actively on that video, when 
    // we click the touchableopactivty, the play button will hide using an arrow function and set the playing to true!
    <TouchableOpacity className="w-full h-60 rounded-xl mt-3 justify-center items-center" activeOpacity={0.7} 
    onPress={()=> setPlaying(true)}>
        {/* Inside the Button we render an Image with source of uri of type thumbnail */}
        {/* It will have the classes that have width and height full, rounded xl and margin top of 3 */}
        {/* The resize mode of cover immeidietely takes up more screen and cannot really see anything happening */}
        {/* Each item's img, thumbnail in the list of posts from the getAllPosts method from the appwrite js function is rendered.*/}
        <Image source={{uri: thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode='cover'></Image>
        {/* Another Image for the play button to activate */}
        {/* If thje source is a url/uri like thumbnail you do a pointin gObject thing like {uri: thumbnail} however if it is simply a static 
        img you do just the folder/directory.pathpointed  */}
        {/* The styles for the play img icon is with width and height set to 48px, aka 12, positition is absolute and not realtive
        since it needs to be directly in center no matter the sizing, the resmize mode is also contain so it is contained inside
        its respective containment */}
        <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain'></Image>
    </TouchableOpacity>
}

    </View>
  )
}

export default VideoCard