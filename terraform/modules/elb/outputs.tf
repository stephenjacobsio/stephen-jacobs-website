output "alb_arn" {
  value       = aws_lb.app_lb.arn
  description = "ARN of the Application Load Balancer"
}

output "alb_dns_name" {
  value       = aws_lb.app_lb.dns_name
  description = "DNS name of the ALB"
}

output "alb_zone_id" {
  value       = aws_lb.app_lb.zone_id
  description = "Zone ID of the ALB for Route 53 configuration"
}