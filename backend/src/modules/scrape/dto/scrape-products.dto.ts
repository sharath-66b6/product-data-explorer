import { IsUrl } from 'class-validator';
export class ScrapeProductsDto {
  @IsUrl()
  url: string;
}
