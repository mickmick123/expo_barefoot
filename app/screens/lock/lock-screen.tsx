import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, ImageStyle, Platform, TouchableOpacity, View, ViewStyle, Image, Text } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { height, width } from ".."
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location';
const marker = require('./crosshair.png')
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const FIXEDMARKER: ViewStyle = {
  left: '50%',
  marginLeft: -16,
  marginTop: -16,
  position: 'absolute',
  top: '50%'
}

const LOCKBTN: ViewStyle = {
  right: '5%',
  position: 'absolute',
  bottom: '5%',
  padding: 10,
  backgroundColor: color.primaryDarker,
  borderRadius: 50
}

const MARKER: ImageStyle = {
  height: 32,
  width: 32
}
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `lock: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="lock" component={LockScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LockScreen: FC<StackScreenProps<NavigatorParamList, "lock">> = observer(function LockScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { authStore } = useStores();
  const map = useRef(null)
  const [region, setRegion] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      authStore.saveCoordinates(location.coords)
      setRegion(location.coords)
      setLoading(false)
      // setLocation(location);
    })();
  }, []);

  return (
    !isLoading && <View style={ROOT}>
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
          ref={map}
          provider={PROVIDER_GOOGLE}
          style={{
            height: height,
            width: width
          }}
          initialRegion={{
            latitude: authStore.coords ? authStore.coords.latitude: 0,
            longitude: authStore.coords ? authStore.coords.longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => setRegion(region)}
        >
          <Marker image={marker} coordinate={{
            latitude: region.latitude,
            longitude: region.longitude
          }} />
          </MapView>
        <TouchableOpacity style={LOCKBTN} onPress={() => {
          navigation.navigate("storeRegistration", {
            coordinates: {
              latitude: region.latitude,
              longitude: region.longitude
            }
          })
        }}>
          <Text style={{
            color: color.palette.white
          }}>Lock Location</Text>
        </TouchableOpacity>
    </View>
  )
})
