import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.prisma.user.findMany();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.prisma.user.create({ data: createUserInput });
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id: updateUserInput.id },
      data: updateUserInput,
    });
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
