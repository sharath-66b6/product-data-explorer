import { PlaywrightCrawler, Dataset } from 'crawlee';

async function run() {
  const crawler = new PlaywrightCrawler({
    maxConcurrency: 2,
    requestHandler: async ({ page, request, enqueueLinks }) => {
      console.log('Visiting', request.url);
      // On worldofbooks home, find nav headings / categories
      const items = await page.$$eval('a', links =>
        links
          .map(l => ({ href: (l as HTMLAnchorElement).href, text: (l as HTMLAnchorElement).innerText.trim() }))
          .filter(x => x.text && x.href.includes('worldofbooks.com/'))
      );

      // Print small sample
      console.log('Found links sample:', items.slice(0, 10));
      await Dataset.pushData({ found: items.slice(0, 40) });
    },
    failedRequestHandler: async ({ request }) => {
      console.error('Failed:', request.url);
    },
  });

  await crawler.run(['https://www.worldofbooks.com/']);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
