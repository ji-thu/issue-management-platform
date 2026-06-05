import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Controller('discussions')
export class DiscussionsController {

  constructor(
    private readonly discussionsService: DiscussionsService,
  ) {}

  @Post()
  create(@Body() dto: CreateDiscussionDto) {
    return this.discussionsService.create(dto);
  }

  @Get(':issueId')
  findByIssue(@Param('issueId') issueId: string) {
    return this.discussionsService.findByIssue(issueId);
  }
}