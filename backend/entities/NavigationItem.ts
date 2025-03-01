import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty, IsOptional, IsBoolean, IsString } from "class-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     NavigationItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the navigation item.
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         label:
 *           type: string
 *           description: Display label for the navigation item.
 *           example: "Home"
 *         path:
 *           type: string
 *           description: URL path associated with the navigation item.
 *           example: "/home"
 *         icon:
 *           type: string
 *           nullable: true
 *           description: Icon associated with the navigation item (if any).
 *           example: "home-icon"
 *         requiresAuth:
 *           type: boolean
 *           description: Indicates whether authentication is required to access the navigation item.
 *           example: false
 */
@Entity()
export class NavigationItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  label!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  path!: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  icon?: string;

  @Column({ default: false })
  @IsBoolean()
  requiresAuth!: boolean;
}