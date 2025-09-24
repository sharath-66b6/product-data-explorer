import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapeService } from './scrape.service';
import { ScrapeController } from './scrape.controller';
import { Product } from '../../entities/product.entity';
import { ProductDetail } from '../../entities/product_detail.entity';
import { Category } from '../../entities/category.entity';
import { Navigation } from '../../entities/navigation.entity';
import { Review } from '../../entities/review.entity';
import { ScrapeJob } from '../../entities/scrape_job.entity';
import { ViewHistory } from '../../entities/view_history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductDetail,
      Category,
      Navigation,
      Review,
      ScrapeJob,
      ViewHistory,
    ]),
  ],
  controllers: [ScrapeController],
  providers: [ScrapeService],
})
export class ScrapeModule {}
