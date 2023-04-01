import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ExameService } from 'src/modules/exame/exame.service';
import { CreateExameDto } from 'src/types/dtos/create-exame.dto';
import { ExameResponseDto } from 'src/types/dtos/exame.response.dto';
import { Exame } from 'src/types/entities/exame.entity';
import { GqlAuthGuard } from '../../auth/auth.guard';

@Resolver('ExameItem')
export class ExameItemResolver {
  
}
