variable "aws_region" {
  default     = "us-east-2"
  description = "AWS Region"
}

variable "cluster_name" {
  default     = "my-eks-cluster"
  description = "EKS Cluster Name"
}

variable "vpc_id" {
  description = "VPC ID for networking"
}

variable "subnet_ids" {
  description = "List of subnets for deploying resources"
  type        = list(string)
}

variable "domain_name" {
  default     = "stephenjacobs.io"
  description = "Primary domain name"
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate"
}

# Database Variables
variable "db_name" {
  default     = "portfolio_db"
  description = "Name of the RDS database"
}

variable "db_username" {
  default     = "dbuser"
  description = "Database username"
}

variable "db_password" {
  description = "Database password"
  sensitive   = true
}