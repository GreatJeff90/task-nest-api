import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTasktDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Res() response, 
    @Body() body: CreateTaskDto,
    @GetUser() user: User
    ) : Promise<CreateTaskDto> {
    const newTask = await this.taskService.create(body, user)
    return response.status(HttpStatus.CREATED).json({newTask})
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.taskService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number, 
    @GetUser() user: User
    ): Promise<Task> {
    return this.taskService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User
    ) {
    return this.taskService.update(id, updateTaskDto, user)
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ) {
    return this.taskService.remove(id, user)
  }
}
