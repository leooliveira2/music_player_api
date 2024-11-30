import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/dto/login.dto';
import { UserRepository } from 'src/interfaces/repositories/user.repository';
import { DateUtils } from 'src/utils/date.utils';
import { HashUtil } from 'src/utils/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDTO): Promise<any> {
    const user = await this.userRepository.findByEmail(email);

    if (!HashUtil.validate(password, user.password)) {
      throw new ForbiddenException({ message: 'Senha inválida!' });
    }

    const payload = await this.jwtService.signAsync({
      email: user.email,
      id: user.id,
    });

    return {
      accessToken: payload,
      user: {
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        createdAt: user.createdAt,
        id: user.id,
      },
      type: 'Bearer',
      expiresIn: new Date(DateUtils.getDateFromNow(3).getTime()),
    };
  }
}
