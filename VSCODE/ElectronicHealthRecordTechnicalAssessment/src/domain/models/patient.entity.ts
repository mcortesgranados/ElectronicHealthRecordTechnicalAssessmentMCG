import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Other'] })
  gender: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;

  @Column({ length: 255, nullable: true })
  emergency_contact?: string;

  @Column({ length: 255, nullable: true })
  insurance_provider?: string;

  @Column({ length: 50, nullable: true })
  insurance_policy_number?: string;

  @Column({ length: 255, nullable: true })
  primary_care_physician?: string;

  @Column({ type: 'text', nullable: true })
  allergies?: string;

  @Column({ type: 'text', nullable: true })
  current_medications?: string;

  @Column({ type: 'text', nullable: true })
  medical_history?: string;

  @Column({ type: 'text', nullable: true })
  social_history?: string;

  @Column({ type: 'text', nullable: true })
  family_history?: string;

  @Column({ length: 255 })
  ehr_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
