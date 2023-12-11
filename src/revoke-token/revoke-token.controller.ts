import { Body, Controller, Delete } from '@nestjs/common';

import { RevokeTokenService } from './revoke-token.service';
import { TokenDto } from 'src/dtos/token.dto';

@Controller('revoke-token')
export class RevokeTokenController {
  constructor(private readonly revokeTokenService: RevokeTokenService) {}

  @Delete()
  async createUser(@Body() tokenDto: TokenDto): Promise<string> {
    return this.revokeTokenService.handleRegister(tokenDto.refreshToken);
  }
}
