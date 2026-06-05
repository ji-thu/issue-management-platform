import { Body, Controller, Get,Post } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { Param } from '@nestjs/common';
import { Patch} from "@nestjs/common";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { Delete } from "@nestjs/common";

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }
  @Get()
  findAll() {
  return this.issuesService.findAll();
 }
    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
    }
    @Patch(":id/status")
updateStatus(
  @Param("id") id: string,
  @Body() dto: UpdateStatusDto,
) {
  return this.issuesService.updateStatus(
    id,
    dto.status,
  );
}
@Delete(":id")
remove(
  @Param("id") id: string,
) {
  return this.issuesService.remove(id);
}
@Patch(":id")
update(
  @Param("id") id: string,
  @Body() body: any,
) {
  return this.issuesService.update(
    id,
    body,
  );
}
}