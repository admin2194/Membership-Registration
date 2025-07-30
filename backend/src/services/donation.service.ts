import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Donation, DonationDocument } from '../schemas/donation.schema';

@Injectable()
export class DonationService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<DonationDocument>,
  ) {}

  async submitDonation(donationData: any): Promise<Donation> {
    const donation = new this.donationModel(donationData);
    return donation.save();
  }

  async getDonationHistory(userId: string): Promise<Donation[]> {
    return this.donationModel.find().sort({ createdAt: -1 }).exec();
  }
} 