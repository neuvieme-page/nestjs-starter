// scripts/seed.ts
import { createConnection } from 'typeorm';
import { seedAdmin } from './admin.seed';

async function run() {
  const connection = await createConnection();
  await seedAdmin(connection);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));
