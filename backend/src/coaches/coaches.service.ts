import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllCoaches(): Promise<User[]> {
    return this.userRepository.find({
      where: { role: UserRole.COACH }
    });
  }

  async getCoachById(id: string): Promise<User> {
    const coach = await this.userRepository.findOne({
      where: { id, role: UserRole.COACH }
    });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return coach;
  }

  async getCoachProfile(coachId: string) {
    const coach = await this.getCoachById(coachId);
    
    return {
      id: coach.id,
      email: coach.email,
      role: coach.role,
      isEmailVerified: coach.isEmailVerified,
      createdAt: coach.createdAt,
      updatedAt: coach.updatedAt
    };
  }

  async searchCoaches(query: string): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: UserRole.COACH })
      .andWhere('user.email ILIKE :query', { query: `%${query}%` })
      .getMany();
  }
}