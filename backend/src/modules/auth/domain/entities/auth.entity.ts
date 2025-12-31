import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  constructor(props: {
    email: string;
    name: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, props);
  }

}
