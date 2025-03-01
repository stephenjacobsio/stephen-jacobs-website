// backend/entities/BlogPost.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsNotEmpty, IsOptional, IsBoolean, IsDateString } from "class-validator";
import { Tag } from "./Tag";

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogPost:
 *       type: object
 *       required:
 *         - title
 *         - date
 *         - excerpt
 *         - category
 *         - slug
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *         excerpt:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         category:
 *           type: string
 *         featured:
 *           type: boolean
 *           default: false
 *         slug:
 *           type: string
 *         readTime:
 *           type: string
 *           nullable: true
 *         imageUrl:
 *           type: string
 *           nullable: true
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *           nullable: true
 */
@Entity()
@Index(["title", "slug", "category"])
export class BlogPost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @IsNotEmpty()
  title!: string;

  @Column()
  @IsDateString()
  date!: string;

  @Column("text")
  @IsNotEmpty()
  excerpt!: string;

  @ManyToMany(() => Tag, (tag) => tag.blogPosts, {
    cascade: true,
    eager: true
  })
  @JoinTable()
  tags!: Tag[];

  @Column()
  @IsNotEmpty()
  category!: string;

  @Column({ default: false })
  @IsBoolean()
  featured!: boolean;

  @Column()
  @IsNotEmpty()
  slug!: string;

  @Column({ nullable: true })
  @IsOptional()
  readTime?: string;

  @Column({ nullable: true })
  @IsOptional()
  imageUrl?: string;

  @UpdateDateColumn({ nullable: true })
  lastUpdated?: Date;
}