import { Controller, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { crawlProducts } from './crawlers/worldofbooks.product';
import { crawlProductDetail } from './crawlers/worldofbooks.detail';
import { ScrapeProductsDto } from './dto/scrape-products.dto';

@Controller('scrape')
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post('products')
  async scrapeProducts(@Body() dto: ScrapeProductsDto) {
    const categorySlug = "summer-reads";
    const { shouldScrape, category } = await this.scrapeService.shouldScrapeCategory(categorySlug);

    if (!shouldScrape) {
      return { message: 'Using cached data', cached: true };
    }

    const products = await crawlProducts(dto.url);
    await this.scrapeService.saveProducts(products, "Category Name", "Navigation Name");

    if (category) {
      category.last_scraped_at = new Date();
      await this.scrapeService['categoryRepo'].save(category);
    }

    return { message: 'Products saved', count: products.length };
  }

  @Post('product/:id/refetch')
  async refetchProduct(@Param('id') id: number) {
    const product = await this.scrapeService.getProductById(id); 
    if (!product) throw new NotFoundException();

    const detail = await crawlProductDetail(product.source_url);

    await this.scrapeService.saveProductDetail(id, detail);

    return { ok: true };
  }
}
