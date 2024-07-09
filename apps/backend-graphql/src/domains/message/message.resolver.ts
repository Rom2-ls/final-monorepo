import { Message } from '@/entities/message.entity';
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PrismaService } from '@/domains/prisma/prisma.service';
import { Inject, UseGuards } from '@nestjs/common';
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
  @Subscription(() => Message, {
    filter: (payload, variables) =>
      payload.messageAdded.group.id === variables.groupId,
  })
  messageAdded(@Args('groupId') groupId: string) {
    return this.pubSub.asyncIterator('messageAdded');
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
}
