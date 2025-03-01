output "db_endpoint" {
  value = aws_db_instance.postgres_db.endpoint
}

output "rds_instance_id" {
  value       = aws_db_instance.postgres_db.id
  description = "ID of the RDS instance"
}

output "rds_endpoint" {
  value       = aws_db_instance.postgres_db.endpoint
  description = "Endpoint of the RDS instance"
}

output "rds_db_name" {
  value       = aws_db_instance.postgres_db.db_name
  description = "Database name of the RDS instance"
}
