output "api_gateway_id" {
  value       = aws_api_gateway_rest_api.api.id
  description = "ID of the API Gateway"
}

output "api_gateway_endpoint" {
  value       = aws_api_gateway_stage.api_stage.invoke_url
  description = "Invoke URL of the API Gateway"
}

output "api_gateway_deployment_id" {
  value       = aws_api_gateway_deployment.api_deployment.id
  description = "Deployment ID of the API Gateway"
}