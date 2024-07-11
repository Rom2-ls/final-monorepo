import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BullModule } from '@nestjs/bullmq';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { UserModule } from '@/domains/user/user.module';
import { PrismaModule } from '@/domains/prisma/prisma.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { MessageModule } from '@/domains/message/message.module';
import { GroupModule } from '@/domains/group/group.module';
import { EventModule } from './domains/event/event.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req, connection }) =>
        connection ? connection.context : { req },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    MessageModule,
    GroupModule,
    EventModule,
  ],
})
export class AppModule {}
