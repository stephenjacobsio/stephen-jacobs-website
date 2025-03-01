import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { BlogPost } from "./BlogPost";

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the tag.
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         name:
 *           type: string
 *           description: Name of the tag.
 *           example: "TypeORM"
 */
@Entity()
export class Tag {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @ManyToMany(() => BlogPost, (blogPost) => blogPost.tags)
  blogPosts!: BlogPost[];
}