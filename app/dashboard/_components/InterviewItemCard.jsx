"use client";

import React from "react";
import { Button } from "../../../@/components/ui/button";
import { useRouter } from "next/navigation";
// id: serial("id").primaryKey(),
// jsonMockInterviewResponse: text("jsonMockInterviewResponse").notNull(),
// jobPosition: varchar("jobPosition").notNull(),
// jobDescription: varchar("jobDescription").notNull(),
// jobExperience: varchar("jobExperience").notNull(),
// Technologies: varchar("jobTechnologies").notNull(),
// createdAt: varchar("createdAt"),
// createdBy: varchar("createdBy").notNull(),
// mockID: varchar("mockID").notNull(),
function InterviewItemCard({ interview }) {
  const router = useRouter();
  const startInterviewHandler = () => {
    router.push(`/dashboard/startinterview/${interview.mockID}`);
  };

  const feedbackHandler = () => {
    router.push(`/dashboard/startinterview/${interview.mockID}/feedback`);
  };
  return (
    <div className="shadow rounded-xl p-4 w-full my-2  ">
      <h2 className="shadow-sm py-2  font-bold text-green-400 px-4 ">
        {interview?.jobPosition}
      </h2>
      <p className="shadow-sm py-2 my-2 text-xs text-gray-400 px-4 ">
        Your Years of Experience : {interview?.jobExperience}.
      </p>
      <p className="shadow-sm py-2 my-2 text-xs text-gray-400 px-4 ">
        Technologies: {interview?.Technologies}
      </p>
      <p className="shadow-sm py-2 my-2 text-xs text-gray-400 px-4 ">
        Job Description : {interview?.jobDescription}
      </p>
      <p className="shadow-sm py-2 my-2 text-xs text-gray-400 px-4 ">
        Created At : {interview?.createdAt}
      </p>

      <div className="flex justify-between my-2 mt-4 ">
        <Button
          onClick={feedbackHandler}
          size="sm"
          variant="outline"
          className=" rounded-[4px]">
          Feedback
        </Button>
        <Button
          size="sm"
          className="  bg-green-400 rounded-[4px]"
          onClick={startInterviewHandler}>
          Start Interview
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
