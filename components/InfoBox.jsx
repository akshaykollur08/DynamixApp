import { View, Text } from 'react-native'
import React from 'react'

// Accept a couple of props/params
const InfoBox = ({title, subtitle, containerStyles, titleStyles}) => {
  return (
    <View className={containerStyles}>
        {/* Text for the subtitle */}
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>

      {/* Text for the subtitle */}
      <Text className="text-sm text-gray-200 text-center font-pregular">{subtitle}</Text>
    </View>

  )
}

export default InfoBox