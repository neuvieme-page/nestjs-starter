import { Connection } from 'typeorm';

import { User, UserRole } from '../../users/user.entity';
import { encrypt } from '../../auth/helpers/encryption';

export const seedUser = async (connection: Connection) => {
  const repo = connection.getRepository(User);

  const password = await encrypt('abcdefg');
  const user = repo.create({
    email: 'testneuviemepage@gmail.com',
    firstName: 'Test',
    lastName: 'TEST',
    role: UserRole.ADMIN,
  });

  const u = await repo.save(user);
};
