import { Module } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { Task } from './entities/task.entity'
import { TypeOrmModule, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'
import { TaskRepository } from './task.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  controllers: [TaskController],
  providers: [
    {
      provide: getRepositoryToken(Task),
      inject: [getDataSourceToken()],
      useFactory(datasource: DataSource) {
        return datasource.getRepository(Task).extend(TaskRepository);
      },
    },
    TaskService
  ],
})
export class TaskModule {}
