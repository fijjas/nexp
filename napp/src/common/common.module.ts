import { Module } from '@nestjs/common';
import { MatchConstraint } from './validators/match.constraint';

@Module({
  providers: [MatchConstraint],
  exports: [MatchConstraint],
})
export class CommonModule {}
