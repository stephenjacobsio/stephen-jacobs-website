variable "api_gateway_name" {
  description = "Name of the API Gateway"
  type        = string
}

variable "backend_url" {
  description = "The URL of the backend service that API Gateway will forward requests to"
  type        = string
}

variable "rest_api_id" {
  description = "ID of the API Gateway REST API"
  type        = string
}

variable "deployment_id" {
  description = "ID of the API Gateway Deployment"
  type        = string
}