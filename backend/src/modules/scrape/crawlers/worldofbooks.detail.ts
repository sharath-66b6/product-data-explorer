import { PlaywrightCrawler } from 'crawlee';

export async function crawlProductDetail(url: string) {
  const result: any = {};
  const crawler = new PlaywrightCrawler({
    maxConcurrency: 1,
    requestHandler: async ({ page }) => {
      await page.waitForSelector('main', { timeout: 10000 });
      result.title = await page.$eval('h1.product-title', el => el.textContent?.trim());
      result.description = await page.$eval('.product-description', el => el.textContent?.trim()).catch(() => null);
      // reviews (if present)
      result.reviews = await page.$$eval('.review', nodes => nodes.map(n => ({
        author: (n.querySelector('.review-author')?.textContent || '').trim(),
        rating: (n.querySelector('.review-rating')?.textContent || '').trim(),
        text: (n.querySelector('.review-text')?.textContent || '').trim(),
      })));
      // specs example
      result.isbn = await page.$eval('.product-specs dd.isbn', el => el.textContent.trim()).catch(()=>null);
    },
  });
  await crawler.run([url]);
  return result;
}
