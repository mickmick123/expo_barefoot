import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
export class FirebaseApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async signUp(
    displayName: string,
    password: string,
    email: string,
    role: string,
    firstName: string,
    lastName: string,
    birthDate: string,
    gender: string,
    civilStatus: string,
    mobile: string
  ): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/users`,
        { displayName, password, email, role, firstName, lastName, birthDate, gender, civilStatus, mobile })
      console.log(response)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const res = response.data

      return { kind: "ok", res }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  async saveStore(params: any, accessToken: any): Promise<any> {
    const response: ApiResponse<any> = await this.api.apisauce.post(`/user/market/registration`, params, {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      }
    })
    try {
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      const res = response.data

      return { kind: "ok", res }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
