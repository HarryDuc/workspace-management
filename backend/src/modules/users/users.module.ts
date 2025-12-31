import { Module } from "@nestjs/common";
import { UserController } from "./presentation/user.controller";
import { UserService } from "./application/services/user.service";
import { UserPrismaRepository } from "./infrastructure/prisma/user.prisma.repository";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: "UserRepository",
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
