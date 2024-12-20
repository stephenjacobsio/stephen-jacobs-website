# Personal Portfolio

A modern, terminal-themed portfolio website built with Next.js and TailwindCSS. The site features a responsive design inspired by oh-my-zsh with the powerlevel10k theme, combining terminal aesthetics with clean typography and smooth interactions.

## Features

- Terminal-inspired design with modern web aesthetics
- Responsive layout adapting to all screen sizes
- Dynamic content sections for projects and blog posts
- Dark mode by default
- AWS S3 static hosting with CloudFront CDN
- Automated deployments via GitHub Actions

## Technologies

- Next.js 14
- TypeScript
- TailwindCSS
- Lucide Icons
- AWS (S3, CloudFront, Route53)
- GitHub Actions

## Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

Install dependencies:
```bash
npm install
# or
yarn install
```

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The site will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The project uses GitHub Actions to automatically deploy to AWS S3. To set up deployment:

1. Create an S3 bucket named `stephenjacobs.io`
2. Configure the bucket for static website hosting
3. Set up CloudFront distribution
4. Configure Route53 records
5. Add required GitHub secrets:
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY
   - CLOUDFRONT_DISTRIBUTION_ID

Pushing to the main branch will trigger automatic deployment.

## Project Structure

```
stephen-jacobs-website/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   └── HeroSection/
│   │       ├── index.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── BlogPost.tsx
│   │       ├── SkillTag.tsx
│   │       └── SocialLink.tsx
│   ├── data/
│   │   ├── projects.ts
│   │   ├── posts.ts
│   │   └── skills.ts
│   └── types/
│       └── index.ts
└── [configuration files]
```

## Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color schemes
- Fira Code font integration
- Custom utilities for terminal-like styling

### Environment Variables

Create a `.env.local` file with:
```env
NEXT_PUBLIC_SITE_URL=https://stephenjacobs.io
```

## Content Management

Content is managed through TypeScript files in the `src/data` directory:
- `projects.ts`: Featured projects
- `posts.ts`: Blog posts
- `skills.ts`: Technical skills

## Customization

### Colors and Theme
The color scheme and theme settings can be modified in `tailwind.config.js`. The default theme uses a dark color palette with cyan accents.

### Layout
The site layout is component-based. Main components can be found in `src/components/` and can be modified independently.

### Content
Update the content files in `src/data/` to change the displayed information. The TypeScript types ensure content structure remains consistent.