import { ObjectType, Field } from '@nestjs/graphql';
import { Message } from './message.entity';
import { Group } from './groups.entity';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Message], { nullable: true })
  messages?: Message[];

  @Field(() => [Group], { nullable: true })
  groups?: Group[];
}
