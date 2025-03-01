import { DeepPartial } from 'typeorm';
import { SocialLink } from '../entities/SocialLink';

export const socialLinks: DeepPartial<SocialLink>[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/yourusername',
    label: 'Follow me on GitHub',
    icon: 'github-icon',
    visible: true
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    label: 'Connect with me on LinkedIn',
    icon: 'linkedin-icon',
    visible: true
  }
];