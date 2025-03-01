import { Project, Technology } from '@/types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'EchoScribe',
    description: 'A real-time transcription and note-taking app powered by AI, designed for meetings and lectures.',
    longDescription:
      'EchoScribe leverages state-of-the-art AI for real-time transcription, searchable notes, and audio analysis. Built with a focus on accessibility and productivity, it supports multiple languages and integrates seamlessly with third-party tools like Google Calendar and Microsoft Teams.',
    technologies: ['React', 'Node.js', 'TypeScript', 'WebSockets', 'OpenAI API'],
    category: 'Web Development',
    featured: true,
    githubUrl: 'https://github.com/username/echoscribe',
    demoUrl: 'https://echoscribe-demo.com',
    imageUrl: '',
  },
  {
    id: 'project-2',
    title: 'Grapevine News',
    description: 'A personalized news aggregator that uses machine learning to curate content based on user preferences.',
    longDescription:
      'Grapevine News is a next-generation news aggregator. It uses machine learning algorithms to analyze reading habits and provide a curated feed tailored to the user. The platform features a clean UI, offline reading support, and integration with popular social media platforms.',
    technologies: ['Python', 'Flask', 'React', 'Scikit-learn', 'PostgreSQL'],
    category: 'Machine Learning',
    featured: true,
    githubUrl: 'https://github.com/username/grapevine-news',
    demoUrl: 'https://grapevine-demo.com',
    imageUrl: '',
  },
  {
    id: 'project-3',
    title: 'DevOps Pipeline Optimizer',
    description: 'A smaller-scale project focused on automating CI/CD pipelines for development teams.',
    longDescription:
      'This project automates the setup and optimization of CI/CD pipelines using Jenkins and GitHub Actions. It focuses on streamlining deployment processes, reducing build times, and enhancing team productivity. Ideal for small to medium-sized development teams.',
    technologies: ['Jenkins', 'GitHub Actions', 'Terraform', 'Docker'],
    category: 'DevOps',
    featured: false,
    githubUrl: 'https://github.com/username/devops-pipeline-optimizer',
    imageUrl: '',
  },
];