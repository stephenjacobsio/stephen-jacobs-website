output "eks_cluster_name" {
  value       = module.eks.cluster_name
  description = "Name of the created EKS cluster"
}

output "elb_dns_name" {
  value       = module.elb.lb_dns_name
  description = "DNS name of the ALB"
}

output "api_gateway_url" {
  value       = module.api_gateway.api_url
  description = "Base URL for API Gateway"
}

output "rds_endpoint" {
  value       = module.rds.db_endpoint
  description = "PostgreSQL database endpoint"
}

output "cloudfront_url" {
  value       = module.s3_cloudfront.cloudfront_url
  description = "CloudFront URL for the React frontend"
}