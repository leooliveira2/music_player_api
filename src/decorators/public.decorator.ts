import { SetMetadata } from '@nestjs/common';
import { IsPublicDecoratorKey } from 'src/constants/constants';

export const IsPublic = () => SetMetadata(IsPublicDecoratorKey, true);
