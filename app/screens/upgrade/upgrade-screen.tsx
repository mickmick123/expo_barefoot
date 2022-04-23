import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text, Header, GradientBackground, AutoImage as Image } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { width } from ".."

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

const TEXTHEADER: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "left",
  padding: 20
}

const UPGRADETITLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1.5,
}
const UPGRADEPRICE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 1.5,
}

const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const FLAT_LIST2: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}


const UPGRADETEXT: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: 'center',
  padding: 10,
  position: 'absolute',
  bottom: 10,
  left: 22,
  width: width * 0.80
}
const UPGRADETEXT2: ViewStyle = {
  alignItems: "flex-start",
  flexDirection: "column",
  justifyContent: 'center',
  padding: 10,
  position: 'absolute',
  bottom: 5,
  left: 10,
  width: width * 0.45
}


const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  justifyContent: 'center',
  padding: 10,
}

const IMAGE: ImageStyle = {
  borderRadius: 5,
  height: 200,
  width: width * 0.80,
  resizeMode: 'cover'
}

const IMAGE2: ImageStyle = {
  borderRadius: 5,
  height: 200,
  width: width * 0.45,
  resizeMode: 'cover'
}

const upgrades = [
  {
    banner: 'https://miro.medium.com/max/1400/1*td3Tm0ZmpJ6mnG1_Uiktxw.png',
    title: 'Celebrity Account',
    price: 2000,
    color: 'orange'
  },
  {
    banner: 'https://miro.medium.com/max/1400/1*td3Tm0ZmpJ6mnG1_Uiktxw.png',
    title: 'Popular Account',
    price: 4000,
    color: 'green'
  },
]

const epoints = [
  {
    banner: 'https://blog.epoints.com/wp-content/uploads/2019/01/epoints-white-bg.png',
    title: '100EP',
    price: 20,
    color: 'blue'
  },
  {
    banner: 'https://blog.epoints.com/wp-content/uploads/2019/01/epoints-white-bg.png',
    title: '300EP',
    price: 50,
    color: 'green'
  },
  {
    banner: 'https://blog.epoints.com/wp-content/uploads/2019/01/epoints-white-bg.png',
    title: '500EP',
    price: 70,
    color: 'yellow'
  },
  {
    banner: 'https://blog.epoints.com/wp-content/uploads/2019/01/epoints-white-bg.png',
    title: '1000EP',
    price: 100,
    color: 'orange'
  },
]
export const UpgradeScreen: FC<StackScreenProps<NavigatorParamList, "upgrade">> = observer(function UpgradeScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const goBack = () => navigation.goBack()
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View testID="MessagesScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerText="Top-up"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      <Text style={TEXTHEADER}>UPGRADES</Text>
      <FlatList
            contentContainerStyle={FLAT_LIST}
            data={[...upgrades]}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Image source={{uri: item.banner}} style={IMAGE} />
                <View style={UPGRADETEXT}>
                    <GradientBackground colors={["rgba(49, 49, 49, 0.50)", item.color]} />
                    <Text style={UPGRADETITLE}>{item.title}</Text>
                    <Text style={UPGRADEPRICE}>{item.price}</Text>
                </View>
              </View>
            )}
            />
      <Text style={TEXTHEADER}>E-POINTS</Text>
      <FlatList
            contentContainerStyle={FLAT_LIST2}
            horizontal
            data={[...epoints]}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }) => (
              <View style={LIST_CONTAINER}>
                <Image source={{uri: item.banner}} style={IMAGE2} />
                <View style={UPGRADETEXT2}>
                    <GradientBackground colors={["rgba(49, 49, 49, 0.50)", item.color]} />
                    <Text style={UPGRADETITLE}>{item.title}</Text>
                    <Text style={UPGRADEPRICE}>{item.price} PHP</Text>
                </View>
              </View>
            )}
            />
      </Screen>
    </View>
  )
})
