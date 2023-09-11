import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CartModule } from './cart/cart.module'
import { TaskModule } from './task/task.module'
import { dataSourceOptions } from 'data-source'
import { AuthModule } from './auth/auth.module'
import { User } from './auth/entities/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CartModule,
    TaskModule,
    AuthModule,
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
