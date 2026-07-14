import * as bcrypt from 'bcrypt';

export class PasswordService {

  // 🔥 HASH PASSWORD
  static async hash(password: string): Promise<string> {

    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  // 🔥 VERIFY PASSWORD
  static async compare(
    password: string,
    hash: string,
  ): Promise<boolean> {

    return bcrypt.compare(password, hash);
  }
}