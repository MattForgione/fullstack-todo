import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsBoolean()
  @IsOptional()
  complete: boolean;
}
