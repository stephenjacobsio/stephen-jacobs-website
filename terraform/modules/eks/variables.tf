variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
}

variable "eks_role_arn" {
  description = "IAM Role ARN for EKS Cluster"
  type        = string
}

variable "fargate_pod_execution_role_arn" {
  description = "IAM Role ARN for Fargate Pods"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID for networking"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs for EKS"
  type        = list(string)
}