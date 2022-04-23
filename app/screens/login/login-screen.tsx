import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, View, ViewStyle, Image, ImageStyle, TextInput, TextStyle, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Alert } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { height, width } from ".."
export const logo = require("./logo.png")
export const userIcon = require("./user.png")
export const key = require("./key.png")
export const fb = require("./fb.png")
export const google = require("./google.png")
import { useStores } from "../../models"

const ROOT: ViewStyle = {
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
const SECTIONSTYLE: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 0.5,
  borderColor: '#000',
  height: 40,
  borderRadius: 5,
  margin: 10,
  width: width * 0.70,
}
const IMAGELOGO: ImageStyle = {
  height: height * 0.15,
  resizeMode: 'contain',
  width: width,
  margin: 20
}

const IMAGESTYLE: ImageStyle = {
  padding: 10,
  margin: 5,
  height: 25,
  width: 25,
  resizeMode: 'stretch',
  alignItems: 'center',
}

const SMALLICON: ImageStyle = {
  padding: 10,
  margin: 5,
  height: 25,
  width: 25,
  resizeMode: 'stretch',
  alignItems: 'center',
}
const ICONCONTAINER: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 10
}

const FOOTER: ViewStyle = {
  backgroundColor: "transparent",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}


const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.orangeDarker,
  borderRadius: 15,
  width: width * 0.70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 5
}
const SIGNUP: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
  borderRadius: 15,
  width: width * 0.70,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 5
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `login: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LoginScreen: FC<StackScreenProps<NavigatorParamList, "login">> = observer(function LoginScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const { authStore } = useStores();

  const loginUser = async () => {
    if(email === "" || password === "") {
      Alert.alert("Username and password are required!")
    }else {
      await authStore.login(email, password)
    }
  }
  
  return (
    <View testID="loginScreen" style={ROOT}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} backgroundColor={color.transparent}>
        <Image style={IMAGELOGO} source={logo} />
        <Text style={{fontSize: 20, fontWeight: '900', margin: 10}}>SIGN IN</Text>
        <KeyboardAvoidingView>
          <View style={SECTIONSTYLE}>
            <Image
              source={userIcon}
              style={IMAGESTYLE}
            />

            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Email Address"
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <Image
              source={key}
              style={IMAGESTYLE}
            />

            <TextInput
              style={{ flex: 1 }}
              secureTextEntry
              placeholder="Enter Your Password"
              underlineColorAndroid="transparent"
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
          </View>
        </KeyboardAvoidingView>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <TouchableOpacity style={CONTINUE} onPress={() => loginUser()}>
              <Text style={CONTINUE_TEXT}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <Text>Sign in with</Text>
          <View style={ICONCONTAINER}>
            <TouchableOpacity>
              <Image source={fb} style={SMALLICON} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={google} style={SMALLICON} />
            </TouchableOpacity>
          </View>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <Text>{`You don't have an account?  `}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
              <Text>
                Sign up now
              </Text>
            </TouchableOpacity>
          </View>
          
        </SafeAreaView>
      </Screen>
    </View>
  )
})
