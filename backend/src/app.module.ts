import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Navigation } from './entities/navigation.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { ProductDetail } from './entities/product_detail.entity';
import { Review } from './entities/review.entity';
import { ScrapeJob } from './entities/scrape_job.entity';
import { ViewHistory } from './entities/view_history.entity';
import { ScrapeModule } from './modules/scrape/scrape.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'worldofbooks',
      entities: [
        Navigation,
        Category,
        Product,
        ProductDetail,
        Review,
        ScrapeJob,
        ViewHistory,
      ],
      synchronize: true,
      logging: true,
    }),
    ScrapeModule,
  ],
})
export class AppModule {}
