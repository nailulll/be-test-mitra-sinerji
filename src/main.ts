import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  process.on("SIGINT", async () => {
    logger.warn("SIGINT signal received: closing HTTP server");
    await app.close();
    process.exit(0);
  });

  app.enableCors({ origin: true });
  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
