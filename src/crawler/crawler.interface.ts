export interface ICrawlerSearch {
	checkin: string;
	checkout: string;
}

export interface ICrawlerResponse {
	name: string;
	description: string;
	bestPrice: string;
	images: string[];
}