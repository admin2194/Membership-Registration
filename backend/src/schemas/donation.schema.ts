import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DonationDocument = Donation & Document;

@Schema({ timestamps: true })
export class Donation {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  note: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation); 