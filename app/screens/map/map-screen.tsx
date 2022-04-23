import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { height, width } from ".."
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: height
}
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `map: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="map" component={MapScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MapScreen: FC<StackScreenProps<NavigatorParamList, "map">> = observer(function MapScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={ROOT} >
      <View style={{
        position: 'absolute',
        top: Platform.OS == 'ios' ? 40: 20,
        left: 20,
        height: 32,
        width: 32,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name={'close-circle'} size={32} color="orange" />
        </TouchableOpacity>
      </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            height: height,
            width: width
          }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    </View>

  )
})
