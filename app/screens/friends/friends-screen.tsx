import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Text, TextField, Header,AutoImage as Image, } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { height, width } from ".."
import { Ionicons } from '@expo/vector-icons'

const ROOT: ViewStyle = {
  flex: 1,
}
const FRIENDPARENT: ViewStyle = {
  display: "flex",
  flexDirection: "row"
}

const CHILDFRIEND: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  margin: 5,
  justifyContent: "center"
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const INNERCONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  width: width,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: 2,
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const USERADDRESS: TextStyle = {
  fontSize: 12,
  letterSpacing: 1.5,
  lineHeight: 15,
  color: 'gray'
}

const USERSTATUS: TextStyle = {
  fontSize: 12,
  letterSpacing: 1.5,
  lineHeight: 15,
  color: 'gray',
  fontWeight: "bold",
}

const USERNAME: TextStyle = {
  fontSize: 14,
  letterSpacing: 1.5,
  lineHeight: 15,
  fontWeight: "bold",
}


const SampleUsers = [
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
  {
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg',
    firstName: 'Herbert',
    lastName: 'Asis',
    address: 'zone 8 bulan, sorsogon',
    cstatus: 'Single',
    distance: '10Km',
    age: 33
  },
]
export const FriendsScreen: FC<StackScreenProps<NavigatorParamList, "friends">> = observer(function FriendsScreen({navigation}) {
  const goBack = () => navigation.goBack()
  return (
    <View style={ROOT} >
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Friends"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <TextField
          placeholder={'Search Friends'}
          style={{
            padding: 5
          }}
        />
        <Screen style={INNERCONTAINER} preset="scroll" backgroundColor={color.transparent}>
          {
            SampleUsers && SampleUsers.map((user, index) => {
              return (
                <TouchableOpacity key={index} style={{ margin: 5 }}>
                  <View style={FRIENDPARENT}>
                    <Image style={{
                        resizeMode: 'stretch',
                        height: 60,
                        width: 60,
                        borderRadius: 100,
                      }} source={{ uri: user.avatar }} />
                      <View style={CHILDFRIEND}>
                          <Text style={USERNAME}>{`${user.firstName} ${user.lastName}`}</Text>
                          <Text style={USERSTATUS}>{`${user.cstatus}, ${user.age}, ${user.distance} away`}</Text>
                          <Text style={USERADDRESS}>{user.address}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </Screen>
      </Screen>
    </View>
  )
})
