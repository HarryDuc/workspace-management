import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/services/user.service";
import { UserPrismaRepository } from "./infrastructure/prisma/user.prisma.repository";
import { JwtAuthGuard } from "@/src/common/guards/jwt.guard";
import { JwtService } from "@nestjs/jwt";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    JwtService,
    {
      provide: "UserRepository",
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
