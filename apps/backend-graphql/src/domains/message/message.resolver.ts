import { Message } from '@/entities/message.entity';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PrismaService } from '@/domains/prisma/prisma.service';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@/guards/gql-auth.guard';
import { CreateMessageInput } from './dto/create-message.input';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PubSub } from 'graphql-subscriptions';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('messages') private readonly messagesQueue: Queue,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  private readonly logger = new Logger(MessageResolver.name);

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message], { name: 'messages' })
  findAll() {
    return this.prisma.message.findMany({
      include: {
        user: true,
        group: true,
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    const placeholderMessage = {
      id: Math.random().toString(),
      content: createMessageInput.content,
    };

    this.messagesQueue.add('createMessage', createMessageInput);

    return placeholderMessage;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Message], { name: 'messagesByGroup' })
  findMessagesByGroup(@Args('groupId') groupId: string) {
    return this.prisma.message.findMany({
      where: {
        groupId,
      },
      include: {
        user: true,
        group: true,
      },
    });
  }

  @Subscription(() => Message, {
    filter: (payload, variables) =>
      payload.messageAdded.groupId === variables.groupId,
  })
  messageAdded(@Args('groupId') groupId: string) {
    this.logger.debug('Message added subscription', {
      groupId,
    });
    return this.pubSub.asyncIterator('messageAdded');
  }
}
