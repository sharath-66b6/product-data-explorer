import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { Category } from '../../entities/category.entity';
import { Navigation } from '../../entities/navigation.entity';
import { ProductDetail } from '../../entities/product_detail.entity';

@Injectable()
export class ScrapeService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    @InjectRepository(Navigation)
    private navRepo: Repository<Navigation>,
    @InjectRepository(ProductDetail)
    private productDetailRepo: Repository<ProductDetail>,
  ) {}

  async saveProductIfNew(p: Partial<Product>, categoryTitle?: string, navigationTitle?: string) {
    let nav: Navigation | undefined;
    let cat: Category | undefined;

    // optional: find or create navigation
    if (navigationTitle) {
      nav = await this.navRepo.findOne({ where: { title: navigationTitle } }) || undefined;
      if (!nav) {
        nav = this.navRepo.create({ title: navigationTitle, slug: navigationTitle.toLowerCase().replace(/\s+/g, '-') });
        await this.navRepo.save(nav);
      }
    }

    // optional: find or create category
    if (categoryTitle) {
      cat = await this.categoryRepo.findOne({ where: { title: categoryTitle } }) || undefined;
      if (!cat) {
        cat = this.categoryRepo.create({ title: categoryTitle, slug: categoryTitle.toLowerCase().replace(/\s+/g, '-'), navigation: nav });
        await this.categoryRepo.save(cat);
      }
    }

    // check if product exists
    if (!p.source_id && p.source_url) p.source_id = p.source_url;
    const exists = await this.productRepo.findOne({ where: { source_id: p.source_id } });
    if (exists) {
      exists.price = p.price ?? exists.price;
      exists.title = p.title ?? exists.title;
      exists.author = p.author ?? exists.author;
      exists.image_url = p.image_url ?? exists.image_url;
      exists.last_scraped_at = new Date();
      return this.productRepo.save(exists);
    } else {
      const newP = this.productRepo.create({ ...p, last_scraped_at: new Date() } as any);
      return this.productRepo.save(newP);
    }
  }

  async saveProducts(products: Partial<Product>[], categoryTitle?: string, navigationTitle?: string) {
    for (const p of products) {
      await this.saveProductIfNew(p, categoryTitle, navigationTitle);
    }
  }

  async shouldScrapeCategory(categorySlug: string, ttlMs = 1000 * 60 * 60 * 24) {
    const existingCat = await this.categoryRepo.findOne({ where: { slug: categorySlug } });

    if (existingCat && existingCat.last_scraped_at) {
      const ageMs = Date.now() - new Date(existingCat.last_scraped_at).getTime();
      if (ageMs < ttlMs) {
        return { shouldScrape: false, category: existingCat };
      }
    }

    return { shouldScrape: true, category: existingCat };
  }

  async getProductById(id: number) {
    return this.productRepo.findOne({ where: { id } });
  }

  async saveProductDetail(productId: number, detail: any) {
    // You should have a ProductDetail entity
    const product = await this.getProductById(productId);
    if (!product) return;

    const productDetail = this.productDetailRepo.create({
      product,
      ...detail,
      last_scraped_at: new Date(),
    });

    return this.productDetailRepo.save(productDetail);
  }


}
