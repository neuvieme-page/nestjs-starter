import { AdminEntity } from 'nestjs-admin';
import { User } from './user.entity'

export class UserAdmin extends AdminEntity {
  entity = User
  searchFields = ['id', 'firstName', 'lastName', 'email']
  listDisplay = ['id', 'firstName', 'lastName', 'email']
}