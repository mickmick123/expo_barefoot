import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetUserResult } from "./api.types";
export class AuthenticationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async login(email: string, password: string): Promise<GetUserResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/users/signin`,
      {email, password})
        console.log(response)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const user = response.data

      return { kind: "ok", user }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
