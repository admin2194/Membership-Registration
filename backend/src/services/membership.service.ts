import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Membership, MembershipDocument } from '../schemas/membership.schema';
import { MembershipLevel, MembershipLevelDocument } from '../schemas/membership-level.schema';

@Injectable()
export class MembershipService {
  constructor(
    @InjectModel(Membership.name) private membershipModel: Model<MembershipDocument>,
    @InjectModel(MembershipLevel.name) private membershipLevelModel: Model<MembershipLevelDocument>,
  ) {}

  async registerMembership(membershipData: any, userId: string): Promise<Membership> {
    const membership = new this.membershipModel({
      ...membershipData,
      userId,
    });
    return membership.save();
  }

  async getMembershipLevels(): Promise<MembershipLevel[]> {
    return this.membershipLevelModel.find().exec();
  }

  async seedMembershipLevels(): Promise<void> {
    const levels = [
      { id: 1, name: 'Pre-revenue', price: 120, frequency: 'Monthly' },
      { id: 2, name: 'Growth', price: 500, frequency: 'Monthly' },
      { id: 3, name: 'Scaling', price: 1000, frequency: 'Monthly' },
      { id: 4, name: 'Exit', price: 1500, frequency: 'Monthly' },
    ];

    for (const level of levels) {
      await this.membershipLevelModel.findOneAndUpdate(
        { id: level.id },
        level,
        { upsert: true, new: true }
      );
    }
  }
} 