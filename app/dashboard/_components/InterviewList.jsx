"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import  InterviewItemCard  from "./InterviewItemCard";
import { InterViewMentorSchema } from "../../../utils/Schema";

import { desc, eq } from "drizzle-orm";
import { db } from "../../../utils/DB";
import { Loader2Icon } from "lucide-react";

export default function InterviewList() {
  const { user, isLoaded } = useUser(); // Add isLoaded to check if the user is fully loaded
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (isLoaded && user) {
      getUserInterviewList();
    }
  }, [isLoaded, user]); // Run effect when isLoaded or user changes

  const getUserInterviewList = async () => {
    setLoading(true); // Set loading to true before fetching data
    const result = await db
      .select()
      .from(InterViewMentorSchema)
      .where(
        eq(
          InterViewMentorSchema.createdBy,
          user?.primaryEmailAddress?.emailAddress
        )
      )
      .orderBy(desc(InterViewMentorSchema.id));

    console.log(result);
    setInterviewList(result);
    setLoading(false);
  };

  return (
    <div className="grid place-items-center  ">
      <h2 className="text-green-400 font-bold">Your Past Interview Catalogue.</h2>
     
     
      {loading ? (
        <p>
          {" "}
          <Loader2Icon color="green" size={50} className="animate-spin" />
        </p>
      ) : interviewList.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2  md:gap-9" >
          {interviewList.map((interview) => (
            <InterviewItemCard key={interview.createdAt} interview={ interview} />

          
          ))}
        </ul>
      ) : (
        <p>No interviews found.</p>
      )}
    </div>
  );
}
