import { BlogPost } from '@/types';

export const posts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Setting Up a Proxmox VE 8.3 Cluster with Proxmox Backup Server 8.3',
    date: '2024-03-01',
    excerpt: 'A comprehensive guide to building and managing a high-availability Proxmox VE cluster with integrated Proxmox Backup Server for robust virtualization and backups.',
    slug: 'proxmox-ve-cluster-backup-server',
    tags: ['Proxmox VE', 'Virtualization', 'Backup', 'High Availability'],
    category: 'Infrastructure',
    featured: true,
  },
  {
    id: 'post-2',
    title: 'Automating Your Media Request Pipeline with Jellyfin, Radarr, Sonarr, and More',
    date: '2024-03-10',
    excerpt: 'Learn how to set up an automated media request pipeline using Jellyfin, Radarr, Sonarr, Prowlarr, Jellyseerr, and Sabnzbd for a seamless home media experience.',
    slug: 'automated-media-request-pipeline',
    tags: ['Jellyfin', 'Radarr', 'Sonarr', 'Prowlarr', 'Jellyseerr', 'Sabnzbd', 'Media Server'],
    category: 'Home Automation',
    featured: true,
  },
  {
    id: 'post-3',
    title: 'Building a Raspberry Pi Cluster with PoE Hats and Running K3s',
    date: '2024-03-20',
    excerpt: 'Step-by-step instructions for setting up a Raspberry Pi cluster with PoE hats, installing K3s, and running containerized workloads efficiently.',
    slug: 'raspberry-pi-cluster-k3s',
    tags: ['Raspberry Pi', 'K3s', 'Kubernetes', 'PoE', 'Cluster'],
    category: 'Edge Computing',
    featured: true,
  },
];