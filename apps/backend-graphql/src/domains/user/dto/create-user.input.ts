import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @Field(() => String)
  password: string;
}
