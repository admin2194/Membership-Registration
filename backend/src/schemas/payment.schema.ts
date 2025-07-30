import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  status: string;

  @Prop({ type: String, ref: 'User' })
  userId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment); 