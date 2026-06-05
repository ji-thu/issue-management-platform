import { Injectable } from '@nestjs/common';
import { db } from '../database/db';
import { discussions } from '../database/schema/discussion.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DiscussionsService {

  async create(data: any) {
    const [discussion] = await db
      .insert(discussions)
      .values(data)
      .returning();

    return discussion;
  }

  async findByIssue(issueId: string) {
    return db
      .select()
      .from(discussions)
      .where(eq(discussions.issueId, issueId));
  }
}