import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

export async function comparePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}
