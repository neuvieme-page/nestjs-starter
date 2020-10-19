import * as bcrypt from 'bcryptjs';

export const encrypt = async (data): Promise<string> => {
  return await bcrypt.hash(data, 10);
};

export const compare = async (
  cleanData: string,
  encryptedDate: string,
): Promise<boolean> => {
  return await bcrypt.compare(cleanData, encryptedDate);
};
