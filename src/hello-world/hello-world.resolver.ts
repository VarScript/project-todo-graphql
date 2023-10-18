import {
  Args,
  Float,
  Int,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { type } from 'os';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    description: 'Retorna un hola mundo',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Float, { name: 'randomNumber' })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'From zeto to argm TO',
  })
  getRamdomFromZeroTo(
    @Args('to', {
      nullable: true,
      type: () => Int,
    })
    to: number = 6,
  ): number {
    return Math.floor(Math.random() * to);
  }
}
