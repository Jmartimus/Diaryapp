import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostsModule, TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}
