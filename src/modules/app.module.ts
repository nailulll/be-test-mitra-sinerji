import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { InfrastructureModule } from './infrastructure/infrastructure/infrastructure.module';

@Module({
  imports: [AuthModule, InfrastructureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
