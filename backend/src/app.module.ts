import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IssuesModule } from './issues/issues.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { AnalysisModule } from './analysis/analysis.module';

@Module({
  imports: [IssuesModule, DiscussionsModule, AnalysisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
