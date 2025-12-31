import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthEntity {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  constructor(props: {
    email: string;
    password: string;
  }) {
    Object.assign(this, props);
  }

}
