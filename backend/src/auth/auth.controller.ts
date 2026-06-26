import { Controller, Post, Body, UseGuards, Get, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() body: { email: string; name: string; password: string }) {
    return this.authService.register(body);
  }

  @Post("login")
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req: any) {
    return this.authService.validateUser(req.user.sub);
  }
}
