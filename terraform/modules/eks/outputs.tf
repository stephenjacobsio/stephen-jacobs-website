output "eks_cluster_name" {
  value       = aws_eks_cluster.eks_cluster.name
  description = "Name of the created EKS cluster"
}

output "eks_cluster_id" {
  value       = aws_eks_cluster.eks_cluster.id
  description = "ID of the created EKS cluster"
}

output "eks_cluster_endpoint" {
  value       = aws_eks_cluster.eks_cluster.endpoint
  description = "Endpoint for the Kubernetes API server"
}

output "eks_cluster_certificate_authority" {
  value       = aws_eks_cluster.eks_cluster.certificate_authority[0].data
  description = "Certificate authority data for EKS cluster"
}

output "eks_fargate_profile_name" {
  value       = aws_eks_fargate_profile.fargate_profile.fargate_profile_name
  description = "Name of the EKS Fargate profile"
}