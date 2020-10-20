import { User } from '../../user/user.entity'

export class IdentityBaseDTO {
  provider: string
  uid: string
  secret: string
  user: User | null = null;
}