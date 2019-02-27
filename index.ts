import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
	
	const app = await NestFactory.create(AppModule);

	app.enableCors();

	await app.listen(8000);
}

bootstrap().catch(e => {
	
	console.log(e);
});