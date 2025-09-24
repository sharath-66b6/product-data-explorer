import { PlaywrightCrawler } from 'crawlee';
import * as dotenv from 'dotenv';
dotenv.config();


export async function crawlProducts(url: string) {
  let products: any[] = [];

  const crawler = new PlaywrightCrawler({
    maxConcurrency: 2,
    requestHandler: async ({ page }) => {
      await page.waitForSelector('.ais-InfiniteHits-item', { timeout: 10000 });

      const pageProducts = await page.$$eval('.ais-InfiniteHits-item', tiles =>
        tiles.map(t => {
          const linkEl = t.querySelector('h3.card__heading a.product-card') as HTMLAnchorElement;
          return {
            source_id: linkEl?.dataset.item_id || linkEl?.href,
            title: linkEl?.textContent?.trim(),
            author: t.querySelector('p.author')?.textContent?.trim(),
            price: t.querySelector('div.price-item')?.textContent?.trim(),
            image_url: t.querySelector('img')?.getAttribute('src'),
            source_url: linkEl?.href,
          };
        })
      );

      products.push(...pageProducts);
    },
  });

  await crawler.run([url]);
  return products;
}



// Run script from CLI
if (require.main === module) {
  const url = process.env.SCRAPE_URL || process.argv[2];
  if (!url) {
    console.error('Please provide a URL as the first argument or set SCRAPE_URL env variable');
    process.exit(1);
  }

  crawlProducts(url)
    .then(products => {
      console.log(`✅ Scraped ${products.length} products`);
      console.log(products.slice(0, 3)); // show a preview
    })
    .catch(e => {
      console.error('❌ Scrape failed:', e);
      process.exit(1);
    });
}

