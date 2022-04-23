import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Header, GradientBackground, Screen, Text, AutoImage as Image } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { height, width } from ".."

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const USERPROFILE: ViewStyle = {
  backgroundColor: color.transparent,
  display: "flex",
  flexDirection: "row",
  padding: 20
}
const USERINFO: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: 10,
  maxWidth: width*0.70
}
const SOCIALITEM: ViewStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: 'center',
  alignItems:"center",
  padding: 10
}
const SOCIALSTATUS: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: 'flex-end',
  padding: 30,
  paddingTop: 0,
  alignItems: 'center'
}
const FOLLOWBUTTON: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: 'center',
  padding: 10,
  alignItems: 'center',
  backgroundColor: color.primaryDarker,
  borderRadius: 10
}

const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const USERNAME: TextStyle = {
  paddingBottom: spacing[1],
  fontWeight: '600',
}
const SOCIALTITLE: TextStyle = {
  fontWeight: '900',
  color: color.primary
}
const SOCIALSUBTITLE: TextStyle = {
  fontSize: 14,
  color: 'gray'
}

const USERBDAY: TextStyle = {
  fontSize: 12,
  color: 'gray'
}
const USERADDRESS: TextStyle = {
  fontSize: 14,
  color: color.primaryDarker
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `profile: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="profile" component={ProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
const user = {
  firstName: 'Herbert',
  lastName: 'Asis',
  accountStatus: 2,
  age: 33,
  birthDate: '01/17/1989',
  address1: 'Phase 1 Block 10 Lot 21',
  address2: 'Tierra Nevada Gen Trias Cavite',
  avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
}
const followers = [
  {
    follower: '1'
  },
  {
    follower: '2'
  }
]

const friends = [
  {
    friends: '1'
  },
  {
    friends: '2'
  }
]

const events = [
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'sample 1',
    address: 'zone 8 bulan, sorsogon'
  },
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static-cse.canva.com/blob/650963/createbanners.jpg',
    title: 'sample 2',
    address: 'zone 8 bulan, sorsogon'
  },
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'sample 3',
    address: 'zone 8 bulan, sorsogon'
  },
]

const stores = [
  {
    openTime: '7:00AM',
    closeTime: '7:00AM',
    openDays: 'MON-FRI',
    banner: 'data:image/png;base64,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',
    title: 'JOLIBEE',
    address: 'zone 8 bulan, sorsogon',
    status: 'Open'
  },
  {
    openTime: '7:00AM',
    closeTime: '7:00AM',
    openDays: 'MON-FRI',
    banner: 'https://static.wikia.nocookie.net/youtube/images/c/c3/Mcdonald%27s.jpeg/revision/latest?cb=20201119154253',
    title: 'MCDONALDS',
    address: 'zone 8 bulan, sorsogon',
    status: 'Open'
  },
  {
    openTime: '7:00AM',
    closeTime: '7:00AM',
    openDays: 'MON-FRI',
    banner: 'https://www.foxyfolksy.com/wp-content/uploads/2020/07/chicken-inasal-640.jpg',
    title: 'INASAL',
    address: 'zone 8 bulan, sorsogon',
    status: 'Open'
  },
  {
    openTime: '7:00AM',
    closeTime: '7:00AM',
    openDays: 'MON-FRI',
    banner: 'https://www.foxyfolksy.com/wp-content/uploads/2020/07/chicken-inasal-640.jpg',
    title: 'INASAL',
    address: 'zone 8 bulan, sorsogon',
    status: 'Open'
  },
  {
    openTime: '7:00AM',
    closeTime: '7:00AM',
    openDays: 'MON-FRI',
    banner: 'https://www.foxyfolksy.com/wp-content/uploads/2020/07/chicken-inasal-640.jpg',
    title: 'INASAL',
    address: 'zone 8 bulan, sorsogon',
    status: 'Open'
  },
]
export const ProfileScreen: FC<StackScreenProps<NavigatorParamList, "profile">> = observer(function ProfileScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const goBack = () => navigation.goBack()

  return (
    <View testID="MessagesScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Profile"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <View style={USERPROFILE}>
            <Image source={{uri: user.avatar}} style={IMAGE} />
            <View style={USERINFO}>
              <Text style={USERNAME}>{user.firstName} {user.lastName}, {user.age}</Text>
              <Text style={USERBDAY}>{user.birthDate}</Text>
              <Text style={USERADDRESS}>{user.address1}, {user.address2}</Text>
            </View>
        </View>
        <View style={SOCIALSTATUS}>
          <TouchableOpacity style={FOLLOWBUTTON}>
            <Text>+ Follow</Text>
          </TouchableOpacity>
          <View style={SOCIALITEM}>
              <Text style={SOCIALTITLE}>{followers.length}</Text>
              <Text  style={SOCIALSUBTITLE}>Followers</Text>
          </View>
          <View style={SOCIALITEM}>
              <Text style={SOCIALTITLE}>{friends.length}</Text>
              <Text  style={SOCIALSUBTITLE}>Friends</Text>
          </View>
          <View style={SOCIALITEM}>
              <Text style={SOCIALTITLE}>{stores.length}</Text>
              <Text  style={SOCIALSUBTITLE}>Stores</Text>
          </View>
          <View style={SOCIALITEM}>
              <Text style={SOCIALTITLE}>{events.length}</Text>
              <Text  style={SOCIALSUBTITLE}>Events</Text>
          </View>
        </View>
        <ScrollView>
        <View style={{
              width: width * 0.90,
              marginTop: 20,
              padding: 10
            }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>My Events</Text>
              <View style={{
                width: '100%',
                marginTop: 10,
              }}>
                <FlatList
                  horizontal
                  data={events}
                  renderItem={({ item }) =>
                    <View style={{
                      margin: 5
                    }}>
                      <Image style={{ height: height * 0.30, width: width * 0.70, borderRadius: 5 }} source={{ uri: item.banner }} />
                      <View style={{ position: "absolute", left: 0, bottom: 0, width: '100%', height: 'auto', padding: 5 }}>
                        <GradientBackground colors={["rgba(49, 49, 49, 0.50)", "#281b34"]} />
                        <Text style={{ fontWeight: '900', fontSize: 16, marginBottom: 5 }}>{item.title}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{`${item.startDate} - ${item.endDate}`}</Text>
                        <Text>{item.address}</Text>
                        <TouchableOpacity style={{
                          padding: 5,
                          backgroundColor: color.primaryDarker,
                          borderRadius: 5,
                          display: 'flex',
                          width: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10
                        }}>
                          <Text>View Event</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  }
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={{
              width: width * 0.90,
              marginTop: 20,
              padding: 10
            }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>My Stores</Text>
              <View style={{
                width: '100%',
                marginTop: 10,
              }}>
                <FlatList
                  horizontal
                  data={stores}
                  renderItem={({ item }) =>
                    <View style={{
                      margin: 5
                    }}>
                      <Image style={{ height: height * 0.30, width: width * 0.70, borderRadius: 5 }} source={{ uri: item.banner }} />
                      <View style={{ position: "absolute", left: 0, bottom: 0, width: '100%', height: 'auto', padding: 5 }}>
                        <GradientBackground colors={["rgba(49, 49, 49, 0.50)", "#281b34"]} />
                        <Text style={{ fontWeight: '900', fontSize: 16, marginBottom: 5 }}>{item.title}</Text>
                        <Text style={{ fontWeight: '600', fontSize: 12 }}>{`${item.openDays} : ${item.openTime} - ${item.closeTime}`}</Text>
                        <Text>{item.address}</Text>
                        <TouchableOpacity style={{
                          padding: 5,
                          backgroundColor: color.primaryDarker,
                          borderRadius: 5,
                          display: 'flex',
                          width: 100,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginTop: 10
                        }}>
                          <Text>View Event</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  }
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
        </ScrollView>
      </Screen>
    </View>
  )
})
