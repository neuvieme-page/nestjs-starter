import { User } from '../../users/user.entity'

export class IdentityBaseDTO {
  provider: string
  uid: string
  secret: string
  user: User | null = null;
}