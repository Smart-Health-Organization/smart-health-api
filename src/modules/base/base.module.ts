import { Module } from "@nestjs/common";
import { Tokens } from "src/utils/tokens";
import { BaseController } from "./base.controller";
import { BaseService } from "./base.service";


@Module({
  imports: [],
  controllers: [BaseController],
  providers: [
    BaseService,
    {
      provide: Tokens.BASE_OPERATIONS,
      useClass: BaseService,
    },
  ],
  exports: [
    {
      provide: Tokens.BASE_OPERATIONS,
      useClass: BaseService,
    },
  ],
})
export class BaseModule {}