/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://AI-Mock-Interview_owner:HR5e3TUIOzyu@ep-rapid-art-a515zxhe.us-east-2.aws.neon.tech/AI-Mock-Interview?sslmode=require',
    }
  };