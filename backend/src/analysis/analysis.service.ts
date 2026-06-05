import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { db } from '../database/db';
import { issues } from '../database/schema/issue.schema';
import { discussions } from '../database/schema/discussion.schema';

import { GeminiService } from './gemini.service';

@Injectable()
export class AnalysisService {

  constructor(
    private readonly geminiService: GeminiService,
  ) {}

  async analyze(issueId: string) {

    const issueResult = await db
      .select()
      .from(issues)
      .where(eq(issues.id, issueId));

    const issue = issueResult[0];

    if (!issue) {
      return {
        message: 'Issue not found',
      };
    }

    const discussionList = await db
      .select()
      .from(discussions)
      .where(eq(discussions.issueId, issueId));

    const analysis =
      await this.geminiService.analyzeIssue(
        issue,
        discussionList,
      );

    return {
      issue,
      analysis,
    };
  }
}