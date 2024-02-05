export default (): void => {
  console.log('\n------------------------------------------');
  console.log(`DATABASE_URL=${process.env.DATABASE_URL}`);
  console.log(`PRIVATE_API_DOMAIN_NAME=${process.env.PRIVATE_API_DOMAIN_NAME}`);
  console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  console.log('------------------------------------------');
  return;
};
