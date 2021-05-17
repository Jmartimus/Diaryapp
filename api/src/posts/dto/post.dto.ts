import { IsNotEmpty, Max } from 'class-validator';

export class Postdto {
  id: string;

  @IsNotEmpty()
  @Max(200)
  readonly title: string;

  @IsNotEmpty()
  @Max(2000)
  readonly body: string;

  date: string;
}
