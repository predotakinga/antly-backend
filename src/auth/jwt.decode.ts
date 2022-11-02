import { Injectable, Req } from '@nestjs/common';

@Injectable()
export class JwtDecode {
  async lala(@Req() req) {
    console.log(req.cookies['accessToken']);
  }
}
