import { Auth } from './auth.interface'

export interface User extends Auth {
  id?: number
  first_name: string
  last_name: string
  username: string
}
