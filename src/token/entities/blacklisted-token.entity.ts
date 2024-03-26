import { CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryColumn()
  token: string;

  @CreateDateColumn()
  created_at: Date;
}
