import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsArray, IsDateString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Technology:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the technology.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         name:
 *           type: string
 *           description: Name of the technology.
 *           example: "TypeScript"
 *         category:
 *           type: string
 *           description: Category of the technology.
 *           example: "Programming Language"
 *         relatedProjects:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *           description: List of project IDs related to this technology.
 *           example: ["project-123", "project-456"]
 *         featured:
 *           type: boolean
 *           description: Indicates if the technology is featured.
 *           example: true
 *         lastUsed:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: The last date this technology was used.
 *           example: "2024-12-01"
 *         icon:
 *           type: string
 *           nullable: true
 *           description: Icon representing the technology.
 *           example: "typescript-icon"
 */
@Entity()
export class Technology {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  category!: string;

  @Column("simple-array", { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedProjects?: string[];

  @Column({ default: false })
  @IsBoolean()
  featured!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  lastUsed?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;
}