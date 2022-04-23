import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FirebaseApi } from "../../services/api/firebase-api"
import { withEnvironment } from "../extensions/with-environment"
import { flow } from "mobx"
/**
 * Model description here for TypeScript hints.
 */
export const StoreModel = types
  .model("Store")
  .props({})
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveStore: flow(function*(params: any, accessToken: any) {
      const api = new FirebaseApi(self.environment.api);
      const result = yield api.saveStore(params, accessToken)
      alert(JSON.stringify(result))
      if (result.kind === "ok") {
        alert(JSON.stringify(result))
        
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type StoreType = Instance<typeof StoreModel>
export interface Store extends StoreType {}
type StoreSnapshotType = SnapshotOut<typeof StoreModel>
export interface StoreSnapshot extends StoreSnapshotType {}
export const createStoreDefaultModel = () => types.optional(StoreModel, {})
