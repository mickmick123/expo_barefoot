import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DemoScreen, DemoListScreen, HomeScreen, MapScreen, EventsScreen, StoresScreen, MessagesScreen, ProfileScreen, UpgradeScreen, FriendsScreen, LockScreen, RegisterStoreScreen } from "../screens"
const Stack = createStackNavigator();
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{
            headerShown: false,
          }}>

            {/* this are auth pages */}
            <Stack.Screen name="home" component={HomeScreen} />
            <Stack.Screen name="map" component={MapScreen} />
            <Stack.Screen name="events" component={EventsScreen} />
            <Stack.Screen name="stores" component={StoresScreen} />
            <Stack.Screen name="messages" component={MessagesScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="upgrade" component={UpgradeScreen} />
            <Stack.Screen name="friends" component={FriendsScreen} />
            <Stack.Screen name="lock" component={LockScreen} />
            <Stack.Screen name="storeRegistration" component={RegisterStoreScreen} />
            <Stack.Screen name="demo" component={DemoScreen} />
            <Stack.Screen name="demoList" component={DemoListScreen} />

            {/* <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="signUp" component={SignUpScreen} /> */}
        </Stack.Navigator>
    )
}

export default HomeStack;