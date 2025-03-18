import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async assignRole(adminId: string, userId: string, role: UserRole) {
    // First verify that the requesting user is an admin
    const admin = await this.usersService.findById(adminId);
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Only admins can assign roles');
    }

    // Then update the target user's role
    const updatedUser = await this.usersService.updateUserRole(userId, role);
    
    return {
      message: 'User role updated successfully',
      user: {
        email: updatedUser.email,
        role: updatedUser.role
      }
    };
  }

  async getUsers(adminId: string) {
    // Verify admin status
    const admin = await this.usersService.findById(adminId);
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new UnauthorizedException('Only admins can view all users');
    }

    // Return all users (in a real application, you'd want pagination)
    return this.usersService.findAll();
  }
}