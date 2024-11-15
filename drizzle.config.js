
/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interview-mocker_owner:XK3RnZJ9ubsq@ep-holy-voice-a509cwn5.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
    }
  };