import { PipeTransform, UnprocessableEntityException } from "@nestjs/common";
import * as Joi from 'joi';

export class CrawlerPipe implements PipeTransform {

	public transform(payload: any) {

		const { value, error } = Joi.validate(payload, {
			checkin: Joi.string().regex(/\d{8}/).replace(/\//g, ''),
			checkout: Joi.string().regex(/\d{8}/).replace(/\//g, '')
		});

		if (error) {

			throw new UnprocessableEntityException(error);
		}

		return value;
	}
}