import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginUserInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
