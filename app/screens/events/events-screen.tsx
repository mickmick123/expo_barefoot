import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Image, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { GradientBackground, Screen, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { height, width } from ".."
import { Header, Text } from "../../components"
import { Ionicons } from '@expo/vector-icons'
const ROOT: ViewStyle = {
  flex: 1,
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
const SampleData = [
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'Jollibee Bulan Sorsogon',
    address: 'Phase 4 Block 10 Lot 21, Tierra Nevada Cavite'
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
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'sample 3',
    address: 'zone 8 bulan, sorsogon'
  },
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'sample 3',
    address: 'zone 8 bulan, sorsogon'
  },
  {
    startDate: '01/01/2022',
    endDate: '01/01/2023',
    banner: 'https://static3.depositphotos.com/1000246/101/v/600/depositphotos_1016297-stock-illustration-grungy-multicolor-banners.jpg',
    title: 'sample 3',
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
export const EventsScreen: FC<StackScreenProps<NavigatorParamList, "events">> = observer(function EventsScreen({navigation}) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const goBack = () => navigation.goBack()
  return (
    <View style={ROOT} >
      <GradientBackground colors={["#422443", "#281b34"]} />  
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}> 
        <Header
            headerTx="barefoot.eventTitle"
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          /> 
          <TextField 
            placeholder={'Search Events'}
            style={{
              padding: 5
            }}
          />
          <Screen style={INNERCONTAINER} preset="scroll" backgroundColor={color.transparent}> 
            {
              SampleData && SampleData.map((event, index) => {
                return (
                  <TouchableOpacity key={index} style={{margin: 5}}>
                    <View style={{
                      paddingBottom: 5,
                      width: width * 0.45,
                    }}>
                      <Image style={{
                        resizeMode: 'stretch',
                        height: height * 0.20,
                        width: width * 0.45,
                        borderRadius: 10
                      }} source={{uri: event.banner}} />
                      <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "center",
                        flexWrap: 'wrap',
                        paddingTop: 3
                      }}>
                        <Ionicons name="pin" size={16} style={{flexBasis: '10%'}} color="orange" />
                          <Text  style={{fontSize: 12, color: color.palette.offWhite, flexBasis: '90%'}}>
                            {event.address}
                          </Text>
                      </View>
                      <Text style={{fontWeight: '600', fontSize: 14}}>{event.title}</Text>
                      <Text style={{fontWeight: '600', fontSize: 12, color: color.primaryDarker}}>{`${event.startDate} - ${event.endDate}`}</Text>
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
