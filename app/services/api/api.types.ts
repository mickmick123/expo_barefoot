import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { UserData } from "../../models/user/user"
export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type UserDataResult = { kind: "ok"; UserData: UserData } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

