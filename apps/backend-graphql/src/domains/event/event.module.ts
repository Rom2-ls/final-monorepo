import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { PrismaModule } from '@/domains/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [EventGateway],
})
export class EventModule {}
