import { Injectable } from "@nestjs/common";
import { ICrawlerSearch } from "./crawler.interface";

const Crawler = require('crawler');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

@Injectable()
export class CrawlerService {

	private readonly crawler = new Crawler({
		maxConnections: 10,
		jQuery: jsdom,
		callback: function (e: any, res: any, done: any) {

			if (e) {

				console.error(e);
			} else {

				// console.log(res.$('body').html());

				// res.$('input').each(function (this:any) {

				// 	console.log(res.$(this).html());
				// })
				res.$('#inputCheckIn').val('22/01/2019');
				res.$('#inputCheckOut').val('23/01/2019');

				console.log(res.$('#inputCheckIn').val());
				console.log(res.$('#inputCheckOut').val());

				res.$('#MainSearchButton').empty()
			}

			done();
		}
	})

	public execute(payload: ICrawlerSearch) {

		this.crawler.direct({
			uri: `https://myreservations.omnibees.com/default.aspx?q=5462&sid=279c07be-e0a4-491e-9f7e-0ed275fe13af&version=MyReservation#/&diff=false&CheckIn=28022019&CheckOut=01032019&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`,
			callback: function (err, res) {

				if (err) {

					return console.log(err);
				}

				const { window } = new JSDOM(res.body, {
					features: {
						FetchExternalResources   : ['script'],
						ProcessExternalResources : ['script'],
						MutationEvents: '2.0'
					}
				});

				window.addEventListener('load', function () {
					
					setInterval(() => {
						
						console.log(window.document.querySelectorAll('.maintable'));
					}, 1000);
				}, false);
			}
		});
		// this.crawler.queue('https://myreservations.omnibees.com/default.aspx?q=5462&sid=279c07be-e0a4-491e-9f7e-0ed275fe13af&version=MyReservation');
	}
}