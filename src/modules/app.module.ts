import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/utils/all-exceptions.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '72h' },
    }),
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
