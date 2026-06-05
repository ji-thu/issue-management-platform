import {
  Controller,
  Param,
  Post,
} from '@nestjs/common';

import { AnalysisService } from './analysis.service';

@Controller('analysis')
export class AnalysisController {

  constructor(
    private readonly analysisService: AnalysisService,
  ) {}

  @Post(':issueId')
  analyze(
    @Param('issueId') issueId: string,
  ) {
    return this.analysisService.analyze(
      issueId,
    );
  }
}