import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { Modal, Platform, View, ViewStyle, Image, ImageStyle, TextInput, TextStyle, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, Button, Alert } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, Text } from "../../components"
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker'
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import { height, width } from ".."
import { Ionicons } from '@expo/vector-icons';
import { logo } from '../login/login-screen';
import moment from 'moment';
import { useStores } from "../../models"
const ROOT: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  // paddingHorizontal: spacing[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: height + (height * 0.10),
}
const SECTIONSTYLESELECT: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  height: 40,
  borderRadius: 5,
  margin: 5,
  width: width * 0.70,
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
  margin: 5,
  width: width * 0.70,
  padding: 10
}

const SECTIONSTYLEDATE: ViewStyle = {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  backgroundColor: '#fff',
  borderWidth: 0.5,
  borderColor: '#000',
  height: 40,
  borderRadius: 5,
  margin: 5,
  width: width * 0.70,
  padding: 10
}

const IMAGELOGO: ImageStyle = {
  height: height * 0.10,
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
const dropdown1BtnStyle: ViewStyle = {
  width: "100%",
  height: 40,
  backgroundColor: "#FFF",
  borderRadius: 8,
  borderWidth: 1,
  borderColor: "#444",
}

const dropdown1DropdownStyle: ViewStyle = {
  backgroundColor: "#EFEFEF"
}

const dropdown1RowStyle: ViewStyle = {
  backgroundColor: "#EFEFEF",
  borderBottomColor: "#C5C5C5",
}
const dropdown1RowTxtStyle: TextStyle = {
  color: "#444", textAlign: "left"
}

const dropdown1BtnTxtStyle: TextStyle = {
  color: "#444", textAlign: "left"
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

const genders = ["Male", "Female", "Gay", "Lesbian", "Transgender", "LGBTQ+"]
const cstatus = ["Single", "Married", "Widowed", "Divorced"]

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `login: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="login" component={LoginScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const SignUpScreen: FC<StackScreenProps<NavigatorParamList, "signUp">> = observer(function SignUpScreen({ navigation }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [date, setDate] = useState(new Date(1598051730000));
  const [showAndroid, setShowAndroid] = useState(false);
  const [show, setShow] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userStore } = useStores();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (!selectedDate) {
      if (Platform.OS === 'ios') {
        setShow(false)
      } else {
        setShowAndroid(false)
      }
    } else {
      setDate(currentDate);
    }

  };

  const registerUser = async () => {
    if(firstName && 
      lastName && 
      addressLine1 && 
      birthDate &&
      gender &&
      civilStatus &&
      mobile &&
      email &&
      password && 
      confirmPassword
      ) {
        if(password === confirmPassword) {
         const response:any =  await userStore.signUp(`${firstName} ${lastName}`, 
          password, 
          email,
          'l1',
          firstName,
          lastName,
          birthDate,
          gender,
          civilStatus,
          mobile
          )
          if(response.res.success) {
            Alert.alert("Registration successfull")
            navigation.navigate("login")
          }else {
            Alert.alert(response.response.data.message)
          }
        }else {
          Alert.alert("Your passwords did not matched!")
        }
      }else {
        Alert.alert("Please fill required fields!")
      }
  }
  return (
    <View testID="signUpScreen" style={ROOT}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Image style={IMAGELOGO} source={logo} />
        {/* <Text style={{ fontSize: 20, fontWeight: '900', margin: 10 }}>SIGN UP</Text> */}
        <KeyboardAvoidingView>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Your First Name"
              underlineColorAndroid="transparent"
              value={firstName}
              onChangeText={(val) => setFirstName(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter Your Last Name"
              underlineColorAndroid="transparent"
              value={lastName}
              onChangeText={(val) => setLastName(val)}
            />
          </View>
          <TouchableOpacity style={[SECTIONSTYLEDATE]} onPress={() => Platform.OS == 'ios' ? setShow(true) : setShowAndroid(true)}>
            <Text style={{ color: '#ddd', textAlign: 'left' }}>{birthDate ? birthDate : 'Birth Date'}</Text>
          </TouchableOpacity >
          <View style={SECTIONSTYLESELECT}>
            <SelectDropdown
              data={genders}
              defaultValue={gender}
              // buttonStyle={{ width: '100%', borderRadius: 5, height: '100%' }}
              defaultButtonText={"Select Gender"}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={dropdown1BtnStyle}
              buttonTextStyle={dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} size={32} color="gray" />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={dropdown1DropdownStyle}
              rowStyle={dropdown1RowStyle}
              rowTextStyle={dropdown1RowTxtStyle}
            />
          </View>
          <View style={SECTIONSTYLESELECT}>
            <SelectDropdown
              data={cstatus}
              defaultValue={civilStatus}
              // buttonStyle={{ width: '100%', borderRadius: 5, height: '100%' }}
              defaultButtonText={"Relationship Status"}
              onSelect={(selectedItem, index) => {
                setCivilStatus(selectedItem)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              buttonStyle={dropdown1BtnStyle}
              buttonTextStyle={dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Ionicons name={isOpened ? "chevron-up" : "chevron-down"} size={32} color="gray" />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={dropdown1DropdownStyle}
              rowStyle={dropdown1RowStyle}
              rowTextStyle={dropdown1RowTxtStyle}
            />
          </View>

          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Address Line 1"
              underlineColorAndroid="transparent"
              value={addressLine1}
              onChangeText={(val) => setAddressLine1(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Address Line 2 (optional)"
              underlineColorAndroid="transparent"
              value={addressLine2}
              onChangeText={(val) => setAddressLine2(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Mobile"
              underlineColorAndroid="transparent"
              value={mobile}
              onChangeText={(val) => setMobile(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Email Address"
              underlineColorAndroid="transparent"
              value={email}
              onChangeText={(val) => setEmail(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Password"
              underlineColorAndroid="transparent"
              value={password}
              secureTextEntry
              onChangeText={(val) => setPassword(val)}
            />
          </View>
          <View style={SECTIONSTYLE}>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Confirm Password"
              underlineColorAndroid="transparent"
              value={confirmPassword}
              secureTextEntry
              onChangeText={(val) => setConfirmPassword(val)}
            />
          </View>

        </KeyboardAvoidingView>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <TouchableOpacity style={CONTINUE} onPress={() => registerUser()}>
              <Text style={CONTINUE_TEXT}>REGISTER</Text>
            </TouchableOpacity>
          </View>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
            <Text>{`You already have an account?  `}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("login")}>
              <Text style={{ fontWeight: '900' }}>
                Log in now
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Screen>
      <Modal
        animationType="slide"
        visible={show}
        transparent={true}
        style={{
          backgroundColor: "rgba(49, 49, 49, 0.65)",
        }}
        onRequestClose={() => {
          setShow(!show);
        }}
      >

        <View
          style={{
            height: '35%',
            marginTop: 'auto',
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <TouchableOpacity style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
              <Text style={{ color: "#ff4600" }} onPress={() => {
                setBirthDate(moment(date).format("MM/DD/YYYY"))
                setShow(false)
              }}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { 
              setBirthDate('')
              setShow(false)
              }} style={{ padding: 10, display: 'flex', alignItems: 'center' }}>
              <Text style={{ color: "#ff4600" }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showAndroid ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      ) : <></>}
    </View>
  )
})
