import { IsString } from 'class-validator';

export class StoredTokenDto {
  @IsString()
  token: string;
}
