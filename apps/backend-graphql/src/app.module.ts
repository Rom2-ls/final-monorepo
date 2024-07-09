import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { UserModule } from '@/domains/user/user.module';
import { PrismaModule } from '@/domains/prisma/prisma.module';
import { AuthModule } from '@/domains/auth/auth.module';
import { MessageModule } from '@/domains/message/message.module';
import { GroupModule } from '@/domains/group/group.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
      subscriptions: {
        'graphql-ws': true,
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
  ],
})
export class AppModule {}
