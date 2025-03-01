import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsDateString, IsUrl } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Certification:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the certification.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the certification.
 *           example: "AWS Certified Solutions Architect"
 *         issuer:
 *           type: string
 *           description: Organization that issued the certification.
 *           example: "Amazon Web Services"
 *         date:
 *           type: string
 *           format: date
 *           description: Date the certification was obtained.
 *           example: "2023-05-10"
 *         credentialUrl:
 *           type: string
 *           nullable: true
 *           description: URL to verify the certification.
 *           example: "https://www.credly.com/badges/example"
 *         credentialId:
 *           type: string
 *           nullable: true
 *           description: Unique identifier for the certification credential.
 *           example: "12345-67890"
 *         expires:
 *           type: string
 *           nullable: true
 *           format: date
 *           description: Expiration date of the certification.
 *           example: "2026-05-10"
 */
@Entity()
export class Certification {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @Column()
  @IsNotEmpty()
  issuer!: string;

  @Column()
  @IsDateString()
  date!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @Column({ nullable: true })
  @IsOptional()
  credentialId?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  expires?: string;
}