import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MembershipDocument = Membership & Document;

@Schema({ timestamps: true })
export class Membership {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  faydaId: string;

  @Prop({ required: true })
  passportId: string;

  @Prop({ required: true })
  kebeleId: string;

  @Prop({ required: true })
  tinNumber: string;

  @Prop({ required: true })
  membershipLevelId: number;

  @Prop({ required: true })
  jobTitle: string;

  @Prop({ type: [String], required: true })
  sectors: string[];

  @Prop({ type: [String], required: true })
  needs: string[];

  @Prop({ required: true })
  agreedToTerms: boolean;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership); 