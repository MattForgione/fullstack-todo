import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { encodePassword } from '../auth/utils/bcrypt';
import { DecodedEmailJwt } from '../interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findOne(email: string): Promise<User> {
    const user = this.repo.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`User with email ${email} was not found.`);

    return user;
  }

  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async create(email: string, password: string) {
    const encodedPassword = encodePassword(password);
    const user = this.repo.create({ email, password: encodedPassword });

    return this.repo.save(user);
  }

  async verifyEmail(jwt: DecodedEmailJwt) {
    const user = await this.repo.findOneBy({ email: jwt.email });
    if (!user) throw new NotFoundException('Email not found');
    user.emailVerified = true;

    return this.repo.save(user);
  }
}
