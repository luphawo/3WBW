import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ArticlesModule } from "./articles/articles.module";
import { AlertsModule } from "./alerts/alerts.module";
import { BusinessesModule } from "./businesses/businesses.module";
import { IncidentsModule } from "./incidents/incidents.module";
import { MediaModule } from "./media/media.module";
import { MarketplaceModule } from "./marketplace/marketplace.module";
import { ResidentsModule } from "./residents/residents.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { AnalyticsModule } from "./analytics/analytics.module";

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    ArticlesModule,
    AlertsModule,
    BusinessesModule,
    IncidentsModule,
    MediaModule,
    MarketplaceModule,
    ResidentsModule,
    NotificationsModule,
    AnalyticsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
