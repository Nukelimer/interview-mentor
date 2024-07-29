import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

const InterViewMentorSchema = pgTable("InterviewMentor", {
  id: serial("id").primaryKey(),
  jsonMockInterviewResponse: text("jsonMockInterviewResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  Technologies: varchar("jobTechnologies").notNull(),
  createdAt: varchar("createdAt"),
  createdBy: varchar("createdBy").notNull(),
  mockID: varchar("mockID").notNull(),
});

export default InterViewMentorSchema;
