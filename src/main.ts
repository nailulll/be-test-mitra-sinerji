import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  process.on("SIGINT", async () => {
    logger.warn("SIGINT signal received: closing HTTP server");
    await app.close();
    process.exit(0);
  });

  app.enableCors({ origin: configService.get("CORS_ORIGIN_URL") });
  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
