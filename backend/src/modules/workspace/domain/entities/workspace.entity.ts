import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class WorkspaceEntity {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  ownerId: string;

  constructor(props: {
    name: string;
    description: string;
    color: string;
    ownerId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    Object.assign(this, props);
  }
}
