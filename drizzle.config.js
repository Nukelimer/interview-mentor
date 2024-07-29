import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/Schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: `postgresql://projects_owner:ljbySapf8B0n@ep-polished-mode-a5gkzzal.us-east-2.aws.neon.tech/interview_mentor_database?sslmode=require`,
  },
  verbose: true,
  strict: true,
})
