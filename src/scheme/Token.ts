import { prop } from '@typegoose/typegoose';

class Token {
  @prop({ required: true, unique: true })
  public userToken: string;
  @prop({ required: true, unique: true })
  public refreshToken: string;
  @prop({ required: true, unique: true })
  public username: string;
}

export { Token };
