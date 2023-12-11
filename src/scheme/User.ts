import { prop } from '@typegoose/typegoose';

class User {
  @prop({ required: true, unique: true })
  public username: string;
  @prop({ required: true })
  public password: string;
  @prop({ required: true })
  public email: string;
  @prop({ required: true, default: new Date().getTime() })
  public lastLogin: string;
}

export { User };
