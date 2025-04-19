import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bycrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async sigUp(signUpDto: SignUpDto): Promise<{ success: boolean; message: string; user: { id: string; name: string; email: string }; token: string }> {
    const { name, email, password } = signUpDto;

    const hashedPassword = await bycrpt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
        token,
      };
  }
}
