import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

class UpdateRoleDto {
  role: UserRole;
}

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('users/:userId/role')
  async updateUserRole(
    @Param('userId') userId: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    // The adminId will come from the JWT token in a real implementation
    const adminId = 'current-admin-id';
    return this.adminService.assignRole(adminId, userId, updateRoleDto.role);
  }

  @Get('users')
  async getAllUsers() {
    // The adminId will come from the JWT token in a real implementation
    const adminId = 'current-admin-id';
    return this.adminService.getUsers(adminId);
  }
}