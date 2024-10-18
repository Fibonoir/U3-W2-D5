import { iTodo } from "./itodo"

export interface iUsers {
  id: number
  firstName: string
  lastName: string
  email: string
  image: string
  title: string
  todos?: iTodo[]
}
