export default (): void => {
  console.log("\nSetup test environment");
  process.env.DATABASE_URL =
    "postgresql://postgres:password@db_test:5432/crawler?schema=public";
  process.env.NODE_ENV = "test";
  console.log(`DATABASE_URL=${process.env.DATABASE_URL}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  return;
};
