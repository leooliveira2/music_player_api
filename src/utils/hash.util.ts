import { compareSync, genSaltSync, hashSync } from 'bcrypt';

export class HashUtil {
  static make(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  static validate(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }
}
