variable "s3_bucket_name" {
  description = "Name of the S3 bucket for hosting the frontend"
  type        = string
}

variable "certificate_arn" {
  description = "ARN of the SSL certificate for CloudFront"
  type        = string
}

variable "cloudfront_price_class" {
  description = "Price class for CloudFront distribution"
  type        = string
  default     = "PriceClass_100"
}

variable "cloudfront_enabled" {
  description = "Boolean to enable or disable CloudFront distribution"
  type        = bool
  default     = true
}