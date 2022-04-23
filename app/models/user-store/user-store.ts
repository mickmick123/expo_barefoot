import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel, UserSnapshot } from "../user/user"
import { FirebaseApi } from "../../services/api/firebase-api"
import { withEnvironment } from "../extensions/with-environment"
/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props(
    {
      user: types.optional(types.maybe(UserModel), {}),
    }
  )
  .extend(withEnvironment)
  .views((self) => ({
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    signUp: async (
      displayName: string, 
      password: string, 
      email: string, 
      role: string, 
      firstName: string, 
      lastName: string, 
      birthDate: string, 
      gender: string, 
      civilStatus: string, 
      mobile: string) => {
        const api = new FirebaseApi(self.environment.api);
        return await api.signUp(
          displayName, 
          password, 
          email, 
          role, 
          firstName,
          lastName,
          birthDate,
          gender,
          civilStatus,
          mobile
          )
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType { }
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType { }
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
