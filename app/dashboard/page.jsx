import CreateInterview from "./_components/CreateInterview";
import InterviewList from "./_components/InterviewList";
import React from "react";

function Dashboard() {
  return (
    <div>
      <CreateInterview />

      <InterviewList />
    </div>
  );
}

export default Dashboard;
