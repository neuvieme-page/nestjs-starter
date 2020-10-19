import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeUpdate(event: UpdateEvent<User>) {
    event.entity.updated_at = new Date();
  }

  beforeInsert(event: InsertEvent<User>) {
    event.entity.created_at = new Date();
    event.entity.updated_at = new Date();
  }
}
