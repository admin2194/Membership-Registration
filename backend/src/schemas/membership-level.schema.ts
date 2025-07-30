import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MembershipLevelDocument = MembershipLevel & Document;

@Schema({ timestamps: true })
export class MembershipLevel {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  frequency: string;
}

export const MembershipLevelSchema = SchemaFactory.createForClass(MembershipLevel); 