import { Connection, EntityManager } from 'typeorm';
import AdminUser from 'nestjs-admin/dist/src/adminUser/adminUser.entity';
import { DuplicateUsernameException } from 'nestjs-admin/dist/src/adminUser/exceptions/userAdmin.exception'
import { encrypt } from '../../auth/helpers/encryption'
export const seedAdmin = async (connection: Connection) => {
  const entityManager = new EntityManager(connection)
  
  const admin = new AdminUser()
  admin.username = 'neuviemepage'
  admin.password = await encrypt('password')


  if (await entityManager.findOne(AdminUser, { username: admin.username })) {
    throw new DuplicateUsernameException(admin.username)
  }

  entityManager.save(admin);
};
