import React, { FC, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Dimensions, ImageStyle, TextStyle, SafeAreaView, TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text, GradientBackground, AutoImage as Image } from "../../components"
// import { useStores } from "../../models"
import { color, spacing, typography } from "../../theme"
import Carousel, { Pagination } from 'react-native-snap-carousel'
export const { width, height } = Dimensions.get('screen');
export const events = require("./events.png")
export const cafes = require("./cafes.png")
export const happy = require("./happy.png")

const FULL: ViewStyle = { flex: 1 }

const BOLD: TextStyle = { fontWeight: "bold" }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: height
}
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 44,
  fontSize: 18,
  backgroundColor: color.palette.white,
  width: width * 0.70,
  borderRadius: 5,
  padding: 5,
  marginTop: 3
}

const CONTAINER_TEXT: ViewStyle = {
  paddingVertical: spacing[1],
}


const CAROUSEL: ViewStyle = {
  height: height * 0.50,
}
const VIEWC: ViewStyle = {
  height: height * 0.40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const IMAGEC: ImageStyle = {
  height: height * 0.20,
  resizeMode: 'contain',
  width: width
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}

const FOOTER: ViewStyle = { backgroundColor: "transparent" }
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
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}


export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(function WelcomeScreen({navigation}) {
  const [indexSlider, setIndexSlider] = useState(0)
  const carouselItems = [
    {
        title:"Find the hottest happy hour destinations in the metro",
        url: happy,
    },
    {
        title:"Explore the best restaurants and cafes nearby",
        url: cafes,
    },
    {
        title:"Discover events that interest you",
        url: events,
    }
  ]


  const renderItem = ({item,index}) => {
    return (
      <View style={VIEWC}>
         <Image source={item.url} style={IMAGEC}/>
        <Text style={{padding: 10, bottom: 0,fontSize: 20, position: 'absolute', textAlign: 'center', fontWeight: '900', color:color.palette.white}}>{item.title}</Text>
      </View>

    )
}

  return (
    <View testID="welcomeScreen" style={FULL}>
      <GradientBackground colors={["#ff4600", "#281b34"]} />
       <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <View style={{height: height*0.50, width: width, backgroundColor: 'rgba(221, 125, 71, 0.05)', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>      
            <Carousel
              data={carouselItems}
              renderItem={renderItem}
              sliderWidth={width}
              itemWidth={width}
              style={CAROUSEL}
              onSnapToItem={(index: React.SetStateAction<number>) => setIndexSlider(index) }
            />
            <Pagination
                dotsLength={carouselItems.length}
                activeDotIndex={indexSlider}
                // containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
              />
        </View>
          <SafeAreaView style={FOOTER}>
            <View style={FOOTER_CONTENT}>
              <TouchableOpacity style={CONTINUE} onPress={() => navigation.navigate("login")}>
                  <Text style={CONTINUE_TEXT}>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity style={SIGNUP}>
                  <Text style={CONTINUE_TEXT}>CREATE ACCOUNT</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
       </Screen>
    </View>
  )
})
