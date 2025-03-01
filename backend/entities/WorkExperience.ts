import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsArray } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     WorkExperience:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the work experience.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           description: Job title or position.
 *           example: "Software Engineer"
 *         company:
 *           type: string
 *           description: Name of the company or organization.
 *           example: "TechCorp Solutions"
 *         period:
 *           type: string
 *           description: Time period of employment.
 *           example: "January 2020 - Present"
 *         description:
 *           type: array
 *           items:
 *             type: string
 *           description: List of job responsibilities or achievements.
 *           example: ["Developed scalable backend services", "Improved application performance by 30%"]
 *         location:
 *           type: string
 *           nullable: true
 *           description: Location of the job (if applicable).
 *           example: "San Francisco, CA"
 *         remote:
 *           type: boolean
 *           description: Indicates if the position is remote.
 *           example: true
 */
@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  company!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  period!: string;

  @Column("simple-array")
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  description!: string[];

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Column({ default: false })
  @IsBoolean()
  remote!: boolean;
}