import { flow } from "mobx"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationApi } from "../../services/api/authentication-api";
import { withEnvironment } from "../extensions/with-environment";
import { withStatus } from "../extensions/with-status";
/**
 * Model description here for TypeScript hints.
 */
export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    isAuthenticated: types.optional(types.boolean, false),
    coords: types.maybe(types.model({
      altitude: types.number,
      altitudeAccuracy: types.number,
      accuracy: types.number,
      longitude: types.number,
      latitude: types.number,
      heading: types.number,
    })),
    user: types.optional(types.model({
      uid: types.string,
      displayName: types.string,
      accessToken: types.string,
      userToken: types.string,
      customClaims: types.model({
        role: types.string
      }),
      epoints: types.maybeNull(types.model({
        current_e_points: types.number
      })),
      galleryFolders: types.array(types.undefined),
      followers: types.array(types.undefined),
      friends: types.array(types.undefined),
      following: types.array(types.undefined),
      chatRooms: types.array(types.undefined),
      settings: types.model({
        publicMessaging: types.boolean
      }),
      mobile: types.string,
      aboutMe: types.string,
      gender: types.string,
      radius: types.model({
        people: types.number,
        map: types.number,
        events: types.number,
      }),
      birthDate: types.string,
      address: types.string,
      interests: types.array(types.undefined),
      createdAt: types.model({
        seconds: types.number,
        nanoseconds: types.number,
      }),
      firstName: types.string,
      lastName: types.string,
      coordinates: types.model({
        latitude: types.maybeNull(types.number),
        longitude: types.maybeNull(types.number),
      }),
      civilStatus: types.string,
      gifts: types.model({
        candy: types.maybeNull(types.number),
        flower: types.maybeNull(types.number),
        booze: types.maybeNull(types.number),
        ticket: types.maybeNull(types.number),
        point: types.maybeNull(types.number),
      }),

    }), {
      uid: '',
      displayName: '',
      accessToken: '',
      userToken: '',
      customClaims: {
        role: ''
      },
      epoints: {
        current_e_points: 0
      },
      galleryFolders: [],
      followers: [],
      friends: [],
      following: [],
      chatRooms: [],
      settings: {
        publicMessaging: false
      },
      mobile: '',
      aboutMe: '',
      gender: '',
      radius: {
        people: 0,
        map: 0,
        events: 0
      },
      birthDate: '',
      address: '',
      interests: [],
      createdAt: {
        seconds: 0,
        nanoseconds: 0
      },
      firstName: '',
      lastName: '',
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      civilStatus: '',
      gifts: {
        candy: 0,
        flower: 0,
        booze: 0,
        ticket: 0,
        point: 0
      },
    }),
  })
  .extend(withEnvironment)
  .extend(withStatus)
  .views((self) => ({
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setAuthenticated(value: boolean) {
      self.isAuthenticated = value;
    },
    saveUser: (UserSnapshot: any) => {
      const newUser = {
        uid: UserSnapshot.user.uid,
        displayName: UserSnapshot.user.displayName,
        accessToken: UserSnapshot.user.accessToken,
        userToken: UserSnapshot.user.userToken,
        customClaims: UserSnapshot.user.customClaims,
        ...UserSnapshot.userData
      }
      self.user = newUser
    },
    saveCoordinates: (coords: any) => {
      self.coords = coords
    },
    logoutUser: () => {
      const clearUser = {
        uid: '',
        displayName: '',
        accessToken: '',
        userToken: '',
        customClaims: {
          role: ''
        },
        epoints: {
          current_e_points: 0
        },
        galleryFolders: [],
        followers: [],
        friends: [],
        following: [],
        chatRooms: [],
        settings: {
          publicMessaging: false
        },
        mobile: '',
        aboutMe: '',
        gender: '',
        radius: {
          people: 0,
          map: 0,
          events: 0
        },
        birthDate: '',
        address: '',
        interests: [],
        createdAt: {
          seconds: 0,
          nanoseconds: 0
        },
        firstName: '',
        lastName: '',
        coordinates: {
          latitude: 0,
          longitude: 0
        },
        civilStatus: '',
        gifts: {
          candy: 0,
          flower: 0,
          booze: 0,
          ticket: 0,
          point: 0
        },
      }
      self.user = <any>clearUser
    }
  }))
  .actions((self) => ({
    login: flow(function* (email: string, password: string) {
      self.setStatus('pending')
      const authenticationApi = new AuthenticationApi(self.environment.api);
      const result = yield authenticationApi.login(email, password)

      if (result.kind === "ok") {
        // alert(JSON.stringify(result.user.userData.epoints))
        self.saveUser({
          user: result.user.user,
          userData: result.user.userData
        })
        self.setAuthenticated(true)
        self.setStatus('idle')
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type AuthenticationStoreType = Instance<typeof AuthenticationStoreModel>
export interface AuthenticationStore extends AuthenticationStoreType { }
type AuthenticationStoreSnapshotType = SnapshotOut<typeof AuthenticationStoreModel>
export interface AuthenticationStoreSnapshot extends AuthenticationStoreSnapshotType { }
export const createAuthenticationStoreDefaultModel = () => types.optional(AuthenticationStoreModel, {})
types.optional(AuthenticationStoreModel, {})