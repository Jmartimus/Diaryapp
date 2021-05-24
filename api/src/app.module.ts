import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [PostsModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
