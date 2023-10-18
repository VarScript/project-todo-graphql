import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import {
  CreateTodoInput,
  UpdateTodoInput,
  StatusArgs,
} from './dto';
import { AggregationType } from './types/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'GetAllTodos' })
  findAll(@Args() statusArgs: StatusArgs): Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'GetTodo' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'CreateTodo' })
  createTodo(
    @Args('createTodoInput')
    createTodoInput: CreateTodoInput,
  ) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'UpdateTodo' })
  updateTodo(
    @Args('updateTodoInput')
    updateTodoInput: UpdateTodoInput,
  ) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'DeleteTodo' })
  removeTodo(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.delete(id);
  }

  @Query(() => Int, { name: 'TotalTodosNumber' })
  totalTodos() {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'CompletedTodosNumber' })
  completedTodos() {
    return this.todoService.completedTodos;
  }

  @Query(() => Int, { name: 'PendingTodosNumber' })
  pendignTodos() {
    return this.todoService.pendingTodos;
  }

  @Query(() => AggregationType, { name: 'Aggregations' })
  aggregations(): AggregationType {
    return {
      complete: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      totalTodosComplete: this.todoService.totalTodos,
    };
  }
}
