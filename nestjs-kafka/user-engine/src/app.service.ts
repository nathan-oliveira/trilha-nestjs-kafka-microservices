import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/interfaces/user.entity';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ where: { status: 'ACTIVATE' } });
  }

  async find(userId: number): Promise<User> {
    const { id, name, email, password, phone, status } =
      await this.userRepository.findOne({ where: { id: userId } });

    return {
      id,
      name,
      email,
      password,
      phone,
      status,
    };
  }

  async create(user: User): Promise<UserEntity> {
    // return await this.userRepository.save(user);

    const preload = this.userRepository.create(user);
    return this.userRepository.save(preload);
  }

  async update(userData: UserEntity): Promise<void> {
    /*
    const { id, name, email, phone, password } = userData;
    const user = await this.find(id);

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.userRepository.save(user);
    */
    const preload = await this.userRepository.preload(userData);
    await this.userRepository.save(preload);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  async activate(id: number): Promise<void> {
    await this.userRepository.update(id, { status: 'ACTIVATE' });
  }

  async inactivate(id: number) {
    await this.userRepository.update(id, { status: 'INACTIVATE' });
  }
}
