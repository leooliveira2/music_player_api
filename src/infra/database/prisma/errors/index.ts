export const PrismaErrorCode = {
  AuthenticationFailed: 'P1000', // Authentication failed against the database server at `{database_host}`: `{database_error}`
  DatabaseServerNotReachable: 'P1001', // Can't reach database server at `{database_host}`:`{database_port}`
  DatabaseServerTimeout: 'P1002', // The database server at `{database_host}`:`{database_port}` was reached but timed out
  DatabaseDoesNotExist: 'P1003', // Database `{database_name}` does not exist at `{database_host}`:`{database_port}`
  IncorrectDatabaseCredentials: 'P1008', // Operations timed out with incorrect credentials
  ConstraintViolation: 'P2002', // Unique constraint failed on the `{constraint}`
  RecordNotFound: 'P2025', // An operation failed because it depends on one or more records that were required but not found.
  ForeignKeyViolation: 'P2003', // Foreign key constraint failed on the field: `{field_name}`
  InvalidFieldData: 'P2012', // Missing a required value at `{path}`
  QueryTimedOut: 'P2015', // Query does not return a unique result
  InternalServerError: 'P5000', // An unexpected error occurred in the query engine. This is a non-recoverable error.
  UnknownError: 'UnknownError', // Catch-all for any other errors
} as const;
