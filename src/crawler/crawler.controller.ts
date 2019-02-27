import { Controller, Post, Body } from "@nestjs/common";
import { ICrawlerSearch } from "./crawler.interface";
import { CrawlerService } from "./crawler.service";
import { CrawlerPipe } from "./crawler.pipe";

@Controller()
export class CrawlerController {

	constructor(private readonly crawlerService: CrawlerService) { }

	@Post('/buscar')
	public search(@Body(CrawlerPipe) payload: ICrawlerSearch) {

		this.crawlerService.execute(payload);

		return payload;
	}
}