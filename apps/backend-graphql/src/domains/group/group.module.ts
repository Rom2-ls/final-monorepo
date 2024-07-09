import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupResolver } from './group.resolver';

@Module({
  imports: [PrismaModule],
  providers: [GroupResolver],
})
export class GroupModule {}
