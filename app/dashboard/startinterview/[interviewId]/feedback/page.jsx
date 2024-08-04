"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/DB";
import { UserAnswer } from "../../../../../utils/Schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../../@/components/ui/button";
import { useUser } from "@clerk/nextjs";

function Page({ params }) {
  const { user } = useUser();
  const [feedbackList, setFeedbackList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    getUserFeedBack();
  }, []);

  const getUserFeedBack = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    // console.log(result);

    setFeedbackList(result);
  };

  const userName = user?.fullName || "Wanderer";

  const toggleCollapsible = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-10">
      <h2 className="text-green-400 text-3xl shadow mb-3 p-2 rounded-md capitalize">
        {`Congratulations ${userName}.`}
      </h2>
      <h2 className="shadow mt-3 p-2 rounded-md">
        Here is your interview feedback and statistics.
      </h2>
      <p className="shadow mt-3 p-2 rounded-md">Your overall rating: 9/10.</p>
      <h2 className="shadow mt-3 p-2 rounded-md">
        Here 👇 is your interview question, your answer and Interview Mentor AI
        feedbacks.
      </h2>

      <div className="flex flex-col justify-center items-center w-full">
        {feedbackList.length < 1 ? (
          <div className="mt-24 w-full bg-green-100 text-center rounded-md p-4 flex flex-col justify-center">
            <p>
              You have not done any interview yet. Go back home and take an
              interview.
            </p>
            <Link href={"/dashboard"} className="mt-6 mx-auto p-1 w-fit">
              <Button variant="link" className="bg-green-400 py-1">
                Home
              </Button>
            </Link>
          </div>
        ) : (
          feedbackList.map((feedback, idx) => {
            const isActive = activeIndex === idx;
            return (
              <Collapsible key={idx} open={isActive}>
                <CollapsibleTrigger
                  className="my-4 text-justify p-4 bg-green-200 rounded-xl flex items-center justify-between w-full "
                  onClick={() => toggleCollapsible(idx)}>
                  {feedback.question}
                  {isActive ? (
                    <ChevronUp
                      className=" ml-5 h-[100px] md:h-[40px] md:w-[40px] w-[100px]"
                      size={50}
                    />
                  ) : (
                    <ChevronDown
                      className=" ml-5 h-[100px] md:h-[40px] md:w-[40px] w-[100px]"
                      size={50}
                    />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4">
                    <div className="">
                      <h2
                        className={`rounded-md border py-2 px-4 ${
                          feedback.rating < 4
                            ? "text-yellow-400"
                            : feedback.rating < 10
                            ? "text-green-400"
                            : ""
                        }`}>
                        <strong>Rating:</strong>
                        {feedback?.rating} / 10.
                      </h2>
                      <p
                        className={`rounded-md border py-2 px-4 mt-2 ${
                          feedback.rating < 4
                            ? "text-yellow-400"
                            : feedback.rating < 10
                            ? "text-green-400"
                            : ""
                        }`}>
                        <strong>
                          {" "}
                          {userName.split(" ")[0] || "Wanderer"}'s Answer:
                        </strong>
                        {feedback.yourResponse}.
                      </p>
                      <p className="rounded-md border py-2 px-4 mt-2">
                        <strong>Perfect Response To Give:</strong>{" "}
                        {feedback.correctAns}
                      </p>
                      <p className="rounded-md border py-2 px-4 mt-2">
                        <strong>IM Feedback:</strong> {feedback?.feedback}
                      </p>
                      <p className="rounded-md border py-2 px-4 mt-2">
                        <strong>Test Was Taken On:</strong> {feedback.createdAt}
                        .
                      </p>
                      <p className="rounded-md border py-2 px-4 mt-2">
                        <strong>{userName}'s Email':</strong>{" "}
                        {feedback.userEmail}.
                      </p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Page;
