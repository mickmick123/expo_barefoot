import React, { useEffect, FC } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { width } from ".."
import { Ionicons } from '@expo/vector-icons'
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const LASTLOGIN: TextStyle = {
  fontSize: 12,
  color: color.primaryDarker
}
const LASTMESSAGE: TextStyle = {
  fontSize: 12,
  color: color.dim
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const characters = [
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: '"John Doe" (male) and "Jane Doe" (female) are multiple-use placeholder names that are used when the true name of a person is unknown or is being intentionally concealed. ',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: false,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: false,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    isOnline: true,
    lastMessage: 'Whats the matter?',
    lastLogin: '5 mins ago',
    avatar: 'https://pbs.twimg.com/profile_images/1257280933557710850/95taFO3E_400x400.jpg'
  }
]
export const MessagesScreen: FC<StackScreenProps<NavigatorParamList, "messages">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    function truncate(str, n){
      return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };
    // const { characterStore } = useStores()
    // const { characters } = characterStore

    // useEffect(() => {
    //   async function fetchData() {
    //     await characterStore.getCharacters()
    //   }

    //   fetchData()
    // }, [])

    return (
      <View testID="MessagesScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerText="Messages"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...characters]}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Image source={{ uri: item.avatar }} style={IMAGE} />
                <View style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: 'column',
                  maxWidth: width*0.60,
                  flexBasis: '60%'
                }}>
                  <Text style={[LIST_TEXT, LASTLOGIN]}>{item.lastLogin}</Text>
                  <Text style={LIST_TEXT}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={[LIST_TEXT, LASTMESSAGE]}>{truncate(item.lastMessage, 60)}</Text>
                </View>
                
                <View style={{
                  flexBasis: '20%',
                  display: "flex",
                  justifyContent: 'center',
                  alignItems: 'flex-end'
                }}>
                  
                  {/* <Text style={{
                    color: 'green'
                  }}>{item.isOnline ? 'ONLINE': 'OFFLINE'}</Text> */}
                  {
                    item.isOnline ?
                    <Ionicons name={'chatbubble-ellipses'} size={32} color={color.primary} />
                    :
                    <Ionicons name={'chatbubble-ellipses'} size={32} color="gray" />
                  }
                 
                </View>
              </View>
            )}
          />
        </Screen>
      </View>
    )
  },
)
