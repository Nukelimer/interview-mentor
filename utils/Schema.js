import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const InterViewMentorSchema = pgTable("InterviewMentor", {
  id: serial("id").primaryKey(),
  jsonMockInterviewResponse: text("jsonMockInterviewResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  Technologies: varchar("jobTechnologies").notNull(),
  createdAt: varchar("createdAt"),
  createdBy: varchar("createdBy").notNull(),
  mockID: varchar("mockID").notNull(),
})

export const UserAnswer = pgTable("AnsInterviewMentor", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  feedback: text("feedback"),
  yourResponse: text("yourResponse"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
})
