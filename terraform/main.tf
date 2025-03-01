provider "aws" {
  region = "us-east-1"
}

terraform {
  required_version = ">= 1.3.0"
  backend "s3" {
    bucket  = "terraform-state-bucket"
    key     = "global/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

# Call EKS Module
module "eks" {
  source                         = "./modules/eks"
  cluster_name                   = var.cluster_name
  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  eks_role_arn                   = var.eks_role_arn
  fargate_pod_execution_role_arn = var.fargate_pod_execution_role_arn
}

# Call API Gateway Module
module "api_gateway" {
  source           = "./modules/api_gateway"
  api_gateway_name = var.api_gateway_name
  rest_api_id      = "api_gateway_id"
  deployment_id    = "deployment_id"
  backend_url      = module.elb.alb_dns_name
}

# Call ALB Module
module "elb" {
  source            = "./modules/elb"
  vpc_id            = module.vpc.vpc_id
  subnet_ids        = module.vpc.public_subnets
  security_group_id = module.vpc.elb_security_group
  certificate_arn   = var.certificate_arn
}

# Call RDS Module
module "rds" {
  source            = "./modules/rds"
  db_name           = var.db_name
  db_username       = var.db_username
  db_password       = var.db_password
  subnet_ids        = module.vpc.private_subnets
  security_group_id = module.vpc.db_security_group
}

# Call S3 CloudFront Module
module "s3_cloudfront" {
  source          = "./modules/s3_cloudfront"
  s3_bucket_name  = var.s3_bucket_name
  certificate_arn = var.certificate_arn
}