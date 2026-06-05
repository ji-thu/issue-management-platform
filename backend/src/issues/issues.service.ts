import { Injectable } from '@nestjs/common';
import { db } from '../database/db';
import { issues } from '../database/schema/issue.schema';
import { discussions } from '../database/schema/discussion.schema';
import { eq } from "drizzle-orm";

@Injectable()
export class IssuesService {
  async create(createIssueDto: any) {
    const [issue] = await db
      .insert(issues)
      .values(createIssueDto)
      .returning();

    return issue;
  }
    async findAll() {
    return db.select().from(issues);
    }
    async findOne(id: string) {
    const issue = await db
        .select()
        .from(issues)
        .where(eq(issues.id, id));

    return issue[0];
    }
          async updateStatus(
        id: string,
        status: string,
      ) {
        const [issue] = await db
          .update(issues)
          .set({ status })
          .where(eq(issues.id, id))
          .returning();

        return issue;
      }
     async remove(id: string) {

  await db
    .delete(discussions)
    .where(eq(discussions.issueId, id));

  const [deletedIssue] = await db
    .delete(issues)
    .where(eq(issues.id, id))
    .returning();

  return deletedIssue;
}
async update(
  id: string,
  data: {
    title: string;
    description: string;
    priority: string;
  },
) {
  const [issue] = await db
    .update(issues)
    .set(data)
    .where(eq(issues.id, id))
    .returning();

  return issue;
}
}

