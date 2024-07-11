import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '@/domains/prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';

@Processor('messages')
export class MessageProcessor {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Process('createMessage')
  async createMessage(job: Job) {
    const newMessage = await this.prisma.message.create({
      data: {
        content: job.data.content,
        user: {
          connect: { id: job.data.userId },
        },
        group: {
          connect: { id: job.data.groupId },
        },
      },
    });

    this.pubSub.publish('messageAdded', { messageAdded: newMessage });
  }
}
