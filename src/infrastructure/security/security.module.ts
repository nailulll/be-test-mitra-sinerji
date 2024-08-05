import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ThrottlerBehindProxyGuard } from "./throttler-behind-proxy.guard";

@Module({
  providers: [
    ThrottlerBehindProxyGuard,
  ],
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
  ],
})
export class SecurityModule {
}