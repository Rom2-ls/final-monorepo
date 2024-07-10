import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@/domains/prisma/prisma.service';
import { GqlAuthGuard } from '@/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { Group } from '@/entities/groups.entity';
import { CreateGroupInput } from './dto/create-group.input';

@Resolver()
export class GroupResolver {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Group], { name: 'groups' })
  findAll() {
    return this.prisma.group.findMany({
      include: {
        messages: true,
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Group, { name: 'group' })
  findOne(id: string) {
    return this.prisma.group.findUnique({
      where: { id },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Group], { name: 'groupsByUser' })
  findGroupsByUser(@Args('userId') userId: string) {
    return this.prisma.group.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        messages: {
          take: 5,
        },
      },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Group, { name: 'createGroup' })
  createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.prisma.group.create({
      data: {
        name: createGroupInput.name,
        users: {
          connect: createGroupInput.users?.map((id) => ({ id })),
        },
      },
    });
  }
}
