import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';
import { Group } from './groups.entity';

@ObjectType()
export class Message {
  @Field(() => String)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => User)
  user: User;

  @Field(() => Group)
  group: Group;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}
