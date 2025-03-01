import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsBoolean, IsString, IsArray, IsUrl, IsDateString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the project.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         title:
 *           type: string
 *           description: Title of the project.
 *           example: "Portfolio Website"
 *         description:
 *           type: string
 *           description: Short description of the project.
 *           example: "A portfolio website showcasing my work and skills."
 *         longDescription:
 *           type: string
 *           nullable: true
 *           description: Detailed description of the project.
 *           example: "This is a more detailed explanation of the portfolio website..."
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           description: List of technologies used in the project.
 *           example: ["TypeScript", "React", "Tailwind CSS"]
 *         category:
 *           type: string
 *           description: Category or type of the project.
 *           example: "Web Development"
 *         featured:
 *           type: boolean
 *           description: Indicates if the project is featured.
 *           example: true
 *         githubUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: GitHub repository URL for the project.
 *           example: "https://github.com/example/portfolio-website"
 *         demoUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL to the live demo of the project.
 *           example: "https://example.com/portfolio"
 *         imageUrl:
 *           type: string
 *           format: uri
 *           nullable: true
 *           description: URL to an image or thumbnail representing the project.
 *           example: "https://example.com/image.png"
 *         relatedProjects:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *           description: List of related project IDs.
 *           example: ["project-123", "project-456"]
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Date and time when the project was last updated.
 *           example: "2024-12-19T15:30:00Z"
 */
@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Column("text")
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Column("text", { nullable: true })
  @IsOptional()
  @IsString()
  longDescription?: string;

  @Column("simple-array")
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  technologies!: string[];

  @Column()
  @IsNotEmpty()
  @IsString()
  category!: string;

  @Column({ default: false })
  @IsBoolean()
  featured!: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  githubUrl?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  demoUrl?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @Column("simple-array", { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedProjects?: string[];

  @Column({ nullable: true })
  @IsOptional()
  @IsDateString()
  lastUpdated?: string;
}