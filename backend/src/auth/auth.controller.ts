import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('')
  async getAllUsers(@Res() res) {
    try {
      const users = await this.authService.getAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Getting All Users',
        error,
      });
    }
  }
  @Get('/:userID')
  async getUser(@Res() res, @Param('userID') userID) {
    try {
      const user = await this.authService.getOneUser(userID);
      if (!user) throw new NotFoundException('User not found');
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Error Getting User',
        error,
      });
    }
  }
  @Post('')
  async createUser(@Res() res, @Body() body: UserDTO) {
    try {
      const user = await this.authService.createUserCredentials(body);
      return res.status(HttpStatus.OK).json({
        message: 'User created successfully',
        user,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_IMPLEMENTED).json({
        message: 'Error Creating User',
        error,
      });
    }
  }
  @Post('/login')
  async Login(@Res() res, @Body() body: UserDTO) {
    const users = await this.authService.getAllUsers();
    let loginConfirmation = false;
    for (const user of users) {
      if (user.password === body.password && user.username === body.username) {
        loginConfirmation = true;
        break;
      }
    }
    return res.status(HttpStatus.OK).json({
      isUser: loginConfirmation,
      user: body,
    });
  }
}
