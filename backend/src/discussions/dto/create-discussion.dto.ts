import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscussionDto {
  @IsString()
  @IsNotEmpty()
  issueId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}