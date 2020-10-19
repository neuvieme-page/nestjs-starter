// scripts/seed.ts
import { createConnection } from 'typeorm';
import { seedUser } from './user.seed';

async function run() {
  const connection = await createConnection();
  await seedUser(connection);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
