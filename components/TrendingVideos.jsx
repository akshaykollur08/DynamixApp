import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
// Import the Animatable package
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';

// Import expo av videos

import {Video, ResizeMode} from 'expo-av'
// Create a new component called like TrendingItem

// Object of zoomIn with multiple different states, ie 0,1,2
const zoomIn = {
  0:
  {
    scale: 0.9,
  },
  1:
  {
    scale: 1,
  },
}
// Object of zoomOut with multiple different states, ie 0,1 but 0 is set to state value of 1 while 0 is set to 0.9
const zoomOut = {
  0:
  {
    scale: 1,
  },
  1:
  {
    scale: 0.9,
  },
}

// Add desctructured parameters of activeItem and the item for them to be rendered properly
const TrendingItem = ({ activeItem, item }) => 
{
  // We also need to check if the vide ois playing or not, with the playing stateful variable
  const [playing, setPlaying] = useState(false);
  // Set up a console.log(); for activeItem and item.$id
  console.log(activeItem.$id, item.$id);

  // Set the Animatable's classes for the trending active item with margin right of 5 or 20px/1.25rem
  // The passage of the Object that will be set to the animaton prop will be an object from the animatable competencies
  // If the activeItem is strictly equal to the item's id number then zoomIn else not zoomOUt, and then pass a duration prop as well
  // Duration is for 500ms or 0.5s
  return (
    <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {playing ?
        (
          // Video component has the suorce of the item.video link, the classes are of width of 52 and height of 72, 
          // border radius: rounded of 35 px <--more curvy, the margin top of 3, and background of white in a shade of 10
          // resize ode of special compoentn of the ResizeMode of the CONTAIN
          <Video source={{uri: item.video}} className="w-52 h-72 rounded-[35px] mt-3 bg-white/10" resizeMode={ResizeMode.CONTAIN}
          // Allows the user to use natively controls to their device
          useNativeControls
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
          }></Video>
        ) :
        (
          // !Setr up some classnames for the touchable opacity to have position of relative, items and content centralized, 
          // activeOpacity to be 0.7
          // When it is clicked, the animation will play and setPlaying will be true so for now just a Text element is dispalyed but 
          // our actual program will run the video!!
          <TouchableOpacity className="relative items-center justify-center" activeOpacity={0.7} onPress={() => setPlaying(true)}>
            {/* First time using this component, called ImageBackground! */}
            {/* It will have the source of the item's thumbnail to be the background for the yt type video, it will have the class
        name of the width being 200px/52 and height being 288px or -72. It will have a border radius of 35px. Margin in the y
        of 5px, overflow hidden in the x and y direction, and some shadow pieces added too! */}

            <ImageBackground source={{uri: item.thumbnail}} className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg
          shadow-black/40" resizeMode='cover'>

            </ImageBackground>

            <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain'></Image>

          </TouchableOpacity>
        )
      }




    </Animatable.View>
  )
}


// In this component we want to map over the elements in another FlatList so there is a swiping/scrolling usability of those videos that
// are in the trending section!
// post is a param/prop, and is destructured because passages are of type array of objects!!
const TrendingVideos = ({ posts }) =>
{
  // Creation of a stateful variable that sets the activeItem to the first post out there, ie TRENDING
  const [activeItem, setActiveItem] = useState(posts[1]);

  // Create a new arrow function for viewableItemsChanges
  // In the parameter we are taking in a viewableItems destrucutred
  const viewableItemsChanged = ({viewableItems})=>
  {
    // If the lenght of the viewable items is more than 0, meaning do we have more than 0 items, then we set the activeItem
    // viewableitems[0].key
    if(viewableItems.length>0)
    {
      // Now activeItems are set to keys of those items not the actual item anymore
      setActiveItem(viewableItems[0].key);
    }
  }

  return (
    <FlatList
      data={posts}
      // data={[]}
      // Choose data we want to render
      keyExtractor={(item) => item.id}
      // This allows us to personalize how we want to render our data
      renderItem={({ item }) =>
      (
        // Instead of rendering a text for each item, we now will render the TrendingItem
        // <Text className= "text-white text-3xl">{item.id}</Text>
        <TrendingItem activeItem={activeItem} item={item}></TrendingItem>

      )}
      // On the viewableitemschanged prop we call the viewableItemsChanges function
      onViewableItemsChanged={viewableItemsChanged}
      // Set a prop of viewabilityConfig to the itemVisiblePercentThreshold of 70
      viewabilityConfig={{itemVisiblePercentThreshold: 70}}
      // Set a contentOffset as well of saying x is 170px
      contentOffset={{x:170}}
      // This horizontal FlatList property
      // allows the FlatList to display pieces in a horizontal fashion something we need for a left to right scroller device
      horizontal
    // ?We must now install the react native animatable animations packages for us to have animations for video playing, etc

    >
    </FlatList>
  )
}

export default TrendingVideos