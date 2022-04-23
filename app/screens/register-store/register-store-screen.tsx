import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, TouchableOpacity, Image, ImageStyle, TextInput, Modal } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Header, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { height, width } from ".."
import { useStores } from "../../models"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import * as FileSystem from 'expo-file-system';
export const defaultImage = require("./no-pictures.png")
import Checkbox from 'expo-checkbox'
import * as ImagePicker from 'expo-image-picker';
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
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

const BANNERCONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
  width: width
}

const BANNER: ViewStyle = {
  backgroundColor: color.dim,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 100,
  width: 100,
  borderRadius: 100
}
const DEFAULTBANNER: ImageStyle = {
  resizeMode: "cover",
  height: 64,
  width: 64,
}

const LOGOBANNER: ImageStyle = {
  resizeMode: "cover",
  height: 100,
  width: 100,
  borderRadius: 100
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


const DOCHEADER: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
  marginTop: 20
}

const DOCCONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: width,
  height: height * 0.30,
  margin: 20
}

const DOC: ViewStyle = {
  backgroundColor: color.dim,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
  borderRadius: 10,
  width: width * 0.50,
  height: "100%"
}

const DOCBANNER: ImageStyle = {
  resizeMode: "cover",
  width: width * 0.50,
  height: "100%",
  borderRadius: 10
}

const UPPERCONTAINER: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}


const SUBMITCONTAINER: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10
}

const SUBMITBTN: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  width: width * 0.40,
  backgroundColor: color.primary,
  borderRadius: 100
}

const DISABLEDBTN: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 10,
  width: width * 0.40,
  backgroundColor: color.dim,
  borderRadius: 100
}

const SUBMITTEXT: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const CHECKBOXES: ViewStyle = {
  display: 'flex',
  flexDirection: "column",
  flexWrap: 'wrap',
  maxHeight: 150,
  width: width * 0.70
}


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `registerStore: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="registerStore" component={RegisterStoreScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RegisterStoreScreen: FC<StackScreenProps<NavigatorParamList, "registerStore">> = observer(function RegisterStoreScreen({ navigation, route }) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const weeks = [
    {
      week: 'Monday',
      selected: false
    },
    {
      week: 'Tuesday',
      selected: false
    },
    {
      week: 'Wednesday',
      selected: false
    },
    {
      week: 'Thursday',
      selected: false
    },
    {
      week: 'Friday',
      selected: false
    },
    {
      week: 'Saturday',
      selected: false
    },
    {
      week: 'Sunday',
      selected: false
    },
  ]
  const { coordinates }: any = route.params;
  const { market, authStore } = useStores();
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [logo, setLogo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [isReady, setReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [weekHandler, setWeek] = useState(weeks)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const setChecked = (week: any, selected: boolean) => {
    const newWeeks = weekHandler.map((obj) => {
      if(obj.week === week) {
        obj.selected = !selected
      }
      return obj
    })
    setWeek(newWeeks)
  }

  const pickLogo = async () => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      setLogo(`data:image/png;base64,${result.base64}`);
    }
  };

  const pickImage = async (num: any) => {
    // No permissions request is necessary for launching the image library
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
      base64: true
    });

    if (!result.cancelled) {
      if (num == 1) {
        setImage1(`data:image/png;base64,${result.base64}`);
      } else if (num == 2) {
        setImage2(`data:image/png;base64,${result.base64}`);
      } else {
        setImage3(`data:image/png;base64,${result.base64}`);
      }

    }
  };

  const submitRegistration = async () => {
    const params = {
      uid: authStore.user.uid,
      name: title,
      documents: JSON.stringify([image1, image2, image3]),
      address: address,
      coordinates: JSON.stringify(coordinates),
      type: "store",
      logo: logo,
      parentId: 0,
      totalEP: authStore.user.epoints.current_e_points
    }
    // alert(JSON.stringify([image1, image2, image3]))
    await market.saveStore(params, authStore.user.accessToken)
  }

  useEffect(() => {
    if (title && address && image1 && image2 && image3) {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [title, address, logo, image1, image2, image3])

  return (
    <Screen style={ROOT} preset="fixed">
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Header
        headerText="Store Registration"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
      />
      <View style={UPPERCONTAINER}>
        <View style={BANNERCONTAINER}>
          <TouchableOpacity style={BANNER} onPress={() => pickLogo()}>
            <Image style={logo ? LOGOBANNER : DEFAULTBANNER} source={logo ? { uri: logo } : defaultImage} />
          </TouchableOpacity>
        </View>
        <View style={SECTIONSTYLE}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Store Name"
            underlineColorAndroid="transparent"
            value={title}
            onChangeText={(val) => setTitle(val)}
          />
        </View>
        <View style={SECTIONSTYLE}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Enter Your Store Address"
            underlineColorAndroid="transparent"
            value={address}
            onChangeText={(val) => setAddress(val)}
          />
        </View>
        <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                >
                  <Checkbox
                    style={{
                      margin: 8,
                    }}
                    // onValueChange={() => setChecked(obj.week, obj.selected)}
                    value={false}
                    // color={obj.selected ? '#4630EB' : undefined}
                  />
                  <Text style={{
                    fontSize: 15,
                  }}>24 Hours</Text>
                </TouchableOpacity>
        <TouchableOpacity style={SECTIONSTYLE} onPress={showDatePicker}>
          <Text style={{ color: "gray" }}>Open time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={SECTIONSTYLE} onPress={showDatePicker}>
          <Text style={{ color: "gray" }}>Close time</Text>
        </TouchableOpacity>
        <View style={CHECKBOXES}>
          {
            weekHandler.map((obj) => {
              return (
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                key={obj.week}
                onPress={() => setChecked(obj.week, obj.selected)}
                >
                  <Checkbox
                    style={{
                      margin: 8,
                    }}
                    // onValueChange={() => setChecked(obj.week, obj.selected)}
                    value={obj.selected}
                    color={obj.selected ? '#4630EB' : undefined}
                  />
                  <Text style={{
                    fontSize: 15,
                  }}>{obj.week}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      {/* <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>

        <Text style={DOCHEADER}>Upload Store Documents</Text>
        <View style={DOCCONTAINER}>
          <TouchableOpacity style={DOC} onPress={() => pickImage(1)}>
            <Image style={image1 ? DOCBANNER : DEFAULTBANNER} source={image1 ? { uri: image1 } : defaultImage} />
          </TouchableOpacity>
          <Text>Document #1</Text>
        </View>
        <View style={DOCCONTAINER}>
          <TouchableOpacity style={DOC} onPress={() => pickImage(2)}>
            <Image style={image2 ? DOCBANNER : DEFAULTBANNER} source={image2 ? { uri: image2 } : defaultImage} />
          </TouchableOpacity>
          <Text>Document #2</Text>
        </View>
        <View style={DOCCONTAINER}>
          <TouchableOpacity style={DOC} onPress={() => pickImage(3)}>
            <Image style={image3 ? DOCBANNER : DEFAULTBANNER} source={image3 ? { uri: image3 } : defaultImage} />
          </TouchableOpacity>
          <Text>Document #3</Text>
        </View>
      </Screen> */}
      <View style={SUBMITCONTAINER}>
        <TouchableOpacity disabled={!isReady} style={!isReady ? DISABLEDBTN : SUBMITBTN} onPress={() => setModalVisible(true)}>
          <Text style={SUBMITTEXT}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{
          flex: 1,
          backgroundColor: "rgba(137, 101, 62, 0.5)"
        }}>
          <View style={{
            height: height * 0.25,
            width: width * 0.80,
            padding: 10,
            backgroundColor: color.palette.deepPurple,
            position: "absolute",
            top: height * 0.37,
            left: width * 0.10,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <View style={{
              height: height * 0.18,
              width: width * 0.80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 10
            }}>
              <Text>Your registration will be submitted for review. It will take 24 to 48 hours.</Text>
            </View>

            <View style={{
              height: height * 0.07,
              width: width * 0.80,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10
            }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color.dim,
                flexBasis: "50%",
                borderBottomLeftRadius: 10,
                alignSelf: "stretch"
              }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => submitRegistration()} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: color.primary,
                flexBasis: "50%",
                borderBottomRightRadius: 10,
                alignSelf: "stretch"
              }}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Screen>
  )
})
