import { AdminEntity } from 'nestjs-admin'
import { Identity } from './identity.entity'

export class IdentityAdmin extends AdminEntity {
  entity = Identity
  listDisplay = ['id', 'provider']
}