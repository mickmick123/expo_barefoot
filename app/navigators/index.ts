export type NavigatorParamList = {
    welcome: undefined
    demo: undefined
    demoList: undefined
    login: undefined
    signUp: undefined
    home: undefined
    map: undefined
    events: undefined
    stores: undefined
    messages: undefined
    profile: undefined
    upgrade: undefined
    friends: undefined
    lock: {
      type: string
    },
    storeRegistration: {
      coordinates: {
        latitude: number,
        longitude: number
      }
    }
    // 🔥 Your screens go here
  }
export * from "./app-navigator"
export * from "./navigation-utilities"
// export other navigators from here
