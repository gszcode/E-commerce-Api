import { Auth } from './auth.interface'

export interface User extends Auth {
  first_name: string
  last_name: string
  username: string
}
