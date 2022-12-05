import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { comparePasswords, encodePassword } from '../auth/utils/bcrypt';
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

  async changeUserPassword(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) throw new InternalServerErrorException('User does not exist');
    if (comparePasswords(password, user.password))
      throw new BadRequestException(
        'Password must differ from the previous one'
      );

    user.password = encodePassword(password);

    return this.repo.save(user);
  }
}
