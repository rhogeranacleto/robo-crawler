import { Injectable } from "@nestjs/common";
import { ICrawlerSearch, ICrawlerResponse } from "./crawler.interface";
import puppeter from 'puppeteer';

@Injectable()
export class CrawlerService {

	public async execute(search: ICrawlerSearch) {

		const browser = await puppeter.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
		const page = await browser.newPage();

		await page.goto(`https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation&sid=425b2630-3541-4f3f-bb6e-bc7274989bbf#/&diff=false&CheckIn=${search.checkin}&CheckOut=${search.checkout}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`, {
			waitUntil: 'load'
		});

		const resultsContent = await await page.waitForSelector('#rooms_results');
		const roomsList = await resultsContent.$$('.roomExcerpt');

		const response = await this.getReponseFromRoomsList(roomsList);

		await browser.close();

		return response;
	}

	private getReponseFromRoomsList(roomsList: puppeter.ElementHandle<Element>[]): Promise<ICrawlerResponse[]> {

		return Promise.all(roomsList.map(async room => {

			const name = await room.$('h5');
			const description = await room.$('.description');
			const bestPrice = await room.$('h6.bestPriceTextColor');
			const images = await room.$$('img');

			return {
				name: await this.extractText(name),
				description: await this.extractText(description),
				bestPrice: await this.extractText(bestPrice),
				images: await Promise.all<string>(images.map(async img => {
					
					const src = await img.getProperty('src');

					return src.jsonValue();
				}))
			};
		}));
	}

	private async extractText(element: puppeter.ElementHandle<Element> | null) {

		let text = ''

		if (element) {

			const textContent = await element.getProperty('textContent');

			text = await textContent.jsonValue();
			text = text.trim();
		}

		return text;
	}
}