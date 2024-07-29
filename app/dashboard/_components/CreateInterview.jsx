"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { Loader2Icon, Mic, Pen } from "lucide-react";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";
import { Textarea } from "../../../@/components/ui/textarea";
import { chatSession } from "../../../utils/AIModelAPI";
import { db } from "../../../utils/DB";
import InterViewMentorSchema from "../../../utils/Schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

function CreateInterview() {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [Industry, setIndustry] = useState("");
  const [YEO, setYEO] = useState(0);
  const [Description, setDescription] = useState("");
  const [Technologies, setTechnologies] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const user = useUser();
  const router = useRouter();

  const parseJSON = (jsonString) => {
    try {
      const parsedData = JSON.parse(jsonString);
      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON:", error.message);
      return null;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputSchema = `Job position:${Industry}, Technologies:${Technologies}, Years of Experience:${YEO} and Job Description:${Description}. Depending on Job position, Job Description, Industry and year of experience give us 10 interview questions along with answer in JSON format, give us questions and answer fields in JSON.`;

    try {
      const result = await chatSession.sendMessage(inputSchema);
      const returnedData = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      setLoading(false);

      const parsedData = parseJSON(returnedData);
      if (parsedData) {
        setData(parsedData);
        console.log(parsedData);

        const respon = await db
          .insert(InterViewMentorSchema)
          .values({
            mockID: crypto.randomUUID(),
            jobDescription: Description,
            jobExperience: YEO,
            jobPosition: Industry,
            jsonMockInterviewResponse: returnedData,
            Technologies: Technologies,
            createdBy: user?.user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("ddd DD-MMM-YYYY, hh:mm A"),
          })
          .returning({ mockId: InterViewMentorSchema.mockID });

        if (respon) {
          console.log(respon[0].mockId);
          router.push(`/dashboard/startinterview/${respon[0]?.mockId}`);
        }
      } else {
        throw new Error("Invalid JSON data");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error during submission:", error);
    }
    setToggleDialog(false);
  };

  return (
    <div className="flex m-16 flex-col justify-center">
      <div
        onClick={() => {
          setToggleDialog(true);
        }}
        className="py-12 mt-6 px-10 border flex cursor-pointer hover:scale-105 transition-all delay-200 items-center border-black bg-green-400/5 rounded animate-pulse">
        <p className="mr-2">Start your journey now via voice.</p>
        <Mic size={20} />
      </div>
      <div>
        <Dialog open={toggleDialog}>
          <DialogContent className="outline-none">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                What is your professional milestone?
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <p className="text-sm">
              Tell me, what is the job description that you are interviewing
              for, year(s) of experience, and industry?
            </p>

            <form onSubmit={submitHandler}>
              <div className="w-full items-center mt-4">
                <Label htmlFor="Industry" className="font-bold">
                  Industry.
                </Label>
                <Input
                  onChange={(event) => {
                    setIndustry(event.target.value);
                  }}
                  required
                  className="w-full my-2 py-6 rounded-xl"
                  type="text"
                  id="Industry"
                  placeholder="E.G Engineering, Marketing, Litigation, Medical..."
                />
              </div>
              <div className="w-full items-center mt-4">
                <Label htmlFor="y-o-e" className="font-bold">
                  Years of Experience.
                </Label>
                <Input
                  onChange={(event) => {
                    setYEO(event.target.value);
                  }}
                  className="w-full my-2 py-6 rounded-xl"
                  type="number"
                  max={99}
                  id="y-o-e"
                  required
                  placeholder="Your Years of Experience(s)..."
                />
              </div>
              <div className="w-full items-center mt-4">
                <Label htmlFor="Technologies" className="font-bold">
                  Technologies.
                </Label>
                <Input
                  onChange={(event) => {
                    setTechnologies(event.target.value);
                  }}
                  required
                  className="w-full my-2 py-6 rounded-xl"
                  id="Technologies"
                  placeholder="E.G Excel Microsoft, React.js, MS Powerpoint..."
                />
              </div>
              <div className="w-full items-center mt-4">
                <Label htmlFor="Description" className="font-bold">
                  Job Description.
                </Label>
                <Textarea
                  onChange={(event) => {
                    setDescription(event.target.value);
                  }}
                  required
                  className="w-full rounded-xl"
                  id="Description"
                  placeholder="E.G Product Manager at a tech company."
                />
              </div>

              <div className="gap-6 flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setToggleDialog(false);
                  }}
                  disabled={loading}
                  className="bg-red-600 text-white cursor-pointer px-4 rounded-lg py-2">
                  Cancel
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className={`px-4 py-2 rounded-lg cursor-pointer border bg-green-600 text-white `}>
                  {loading ? (
                    <>
                      <Loader2Icon className="animate-spin inline mr-2" />{" "}
                      Generating
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Dialog open={true}>
          <DialogContent className="outline-none">
            <DialogHeader>
              <DialogTitle className="text-xl text-red-500">Error</DialogTitle>
              <DialogDescription className="">
                please retry again.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={() => {
                  setError(null);
                  setToggleDialog(true);
                }}
                className="bg-green-400 text-white cursor-pointer px-4 rounded-lg py-2">
                Retry
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default CreateInterview;
