import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<any> {
        return this.authService.sigUp(signUpDto)

    }


    @Post('/login')
    login(@Body() loginDto : LoginDto): Promise<any> {
        return this.authService.login(loginDto)

    }

}
