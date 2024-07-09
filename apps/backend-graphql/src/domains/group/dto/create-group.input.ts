import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateGroupInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString({ each: true })
  @Field(() => [String], { nullable: true })
  users?: string[];
}
