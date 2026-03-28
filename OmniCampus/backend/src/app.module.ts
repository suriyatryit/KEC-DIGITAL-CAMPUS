import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClassroomModule } from './classroom/classroom.module';
import { AttendanceModule } from './attendance/attendance.module';
import { CommunicationModule } from './communication/communication.module';

@Module({
  imports: [AuthModule, ClassroomModule, AttendanceModule, CommunicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
