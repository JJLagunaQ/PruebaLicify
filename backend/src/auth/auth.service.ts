import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find();
  }
  async getOneUser(userID: string): Promise<User> {
    const user = await this.userModel.findById(userID);
    return user;
  }
  async createUserCredentials(userDTO: UserDTO): Promise<User> {
    const user = new this.userModel(userDTO);
    return await user.save();
  }
}
