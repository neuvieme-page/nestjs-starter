import { User } from '../../users/user.entity'

export class IdentityCreateDTO {
  email: string
  secret: string
  firstName: string = ''
  lastName: string = ''
  nickName: string = ''
  provider: string = 'local'
  uid: string = ''
  user: User | null = null;
}