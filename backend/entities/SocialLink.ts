import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsString, IsBoolean, IsUrl } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     SocialLink:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the social link.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         platform:
 *           type: string
 *           description: Name of the social media platform.
 *           example: "LinkedIn"
 *         url:
 *           type: string
 *           format: uri
 *           description: URL to the social media profile.
 *           example: "https://www.linkedin.com/in/stephen-jacobs"
 *         label:
 *           type: string
 *           description: Display label for the social link.
 *           example: "Visit my LinkedIn"
 *         icon:
 *           type: string
 *           description: Icon representing the social platform.
 *           example: "linkedin-icon"
 *         visible:
 *           type: boolean
 *           description: Indicates if the social link should be displayed publicly.
 *           example: true
 */
@Entity()
export class SocialLink {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  platform!: string;

  @Column()
  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  label!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  icon!: string;

  @Column({ default: true })
  @IsBoolean()
  visible!: boolean;
}