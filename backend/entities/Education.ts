import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsArray, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Education:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the education record.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         degree:
 *           type: string
 *           description: Degree earned during the education period.
 *           example: "Bachelor of Science in Computer Science"
 *         school:
 *           type: string
 *           description: Name of the school or institution.
 *           example: "University of Example"
 *         period:
 *           type: string
 *           description: Time period of the education.
 *           example: "2010 - 2014"
 *         location:
 *           type: string
 *           nullable: true
 *           description: Location of the school or institution.
 *           example: "Los Angeles, CA"
 *         honors:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *           description: List of honors or achievements earned during the education.
 *           example: ["Magna Cum Laude", "Dean's List"]
 */
@Entity()
export class Education {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  degree!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  school!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  period!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Column("simple-array", { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  honors?: string[];
}