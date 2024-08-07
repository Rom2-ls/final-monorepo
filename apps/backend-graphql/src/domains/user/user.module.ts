import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { PrismaModule } from '@/domains/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver],
})
export class UserModule {}
