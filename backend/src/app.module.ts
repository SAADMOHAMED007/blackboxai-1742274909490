import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';
import { CoachesModule } from './coaches/coaches.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NutritionModule } from './nutrition/nutrition.module';
import { SupplementsModule } from './supplements/supplements.module';
import { PromotionsModule } from './promotions/promotions.module';
import { ProgressModule } from './progress/progress.module';
import { ChatModule } from './chat/chat.module';
import { databaseConfig } from './config/database.config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    ClientsModule,
    CoachesModule,
    SubscriptionsModule,
    NutritionModule,
    SupplementsModule,
    PromotionsModule,
    ProgressModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}