import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),

})

export const McqInterview = pgTable('mcqInterview', {
    id: serial('id').primaryKey(),
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: text('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    mcqCount: integer('mcqCount').notNull(), // Number of MCQs requested
    mcqQuestions: text('mcqQuestions').notNull(), // Store MCQ questions (new field)
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mcqId: varchar('mcqId').notNull() // Unique identifier for each MCQ interview session
});

export const McqUserAnswer = pgTable('mcqUserAnswer', {
    id: serial('id').primaryKey(),
    mcqIdRef: varchar('mcqId').notNull(), // References mcqInterview table
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns: text('userAns'),
    feedback: text('feedback'),
    rating: varchar('rating'),
    userEmail: varchar('userEmail'),
    createdAt: varchar('createdAt')
});