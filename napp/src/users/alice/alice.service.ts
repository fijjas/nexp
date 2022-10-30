import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { IStoredHashData } from './interfaces';

@Injectable()
export class AliceService {
  private static readonly HASH_SALT_BYTES = 16;
  private static readonly HASH_ITERATIONS = 1000;
  private static readonly HASH_KEY_LEN = 64;
  private static readonly HASH_ALGO = 'sha512';

  private readonly crypto = crypto;

  async hashPassword(rawPassword: string, salt: string): Promise<string> {
    const self = AliceService;
    return new Promise((rs, rj) => {
      this.crypto.pbkdf2(
        rawPassword,
        salt,
        self.HASH_ITERATIONS,
        self.HASH_KEY_LEN,
        self.HASH_ALGO,
        (err: Error|null, dk?: Buffer) => {
          err ? rj(err) : rs(dk!.toString('hex'));
        }
      );
    });
  }

  async checkPassword(rawPassword: string, hashedPassword: string, salt: string): Promise<boolean> {
    return hashedPassword && ((await this.hashPassword(rawPassword, salt)) === hashedPassword);
  }

  hashToStored(data: IStoredHashData): string {
    return `${data.salt}:${data.hash}`;
  }

  hashFromStored(storedHash: string): IStoredHashData {
    const [salt, hash] = `${storedHash}`.split(':');
    if (!salt || !hash) {
      throw new Error('Invalid password hash encountered');
    }
    return { salt, hash };
  }

  generateSalt(): string {
    return this.crypto.randomBytes(AliceService.HASH_SALT_BYTES).toString('hex');
  }
}
