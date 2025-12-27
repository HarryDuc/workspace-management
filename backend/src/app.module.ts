import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get('DB_HOST'),
    //     port: +configService.get('DB_PORT'),
    //     username: configService.get('DB_USERNAME'),
    //     password: configService.get('DB_PASSWORD'),
    //     database: configService.get('DB_NAME'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,   // Note: set to false in production
    //     autoLoadEntities: true,
    //     logging: ['query', 'error', 'warn', 'info', 'log'],
    //     maxQueryExecutionTime: 50, // log nếu query > 50ms
    //   }),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local', '.env.development'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
