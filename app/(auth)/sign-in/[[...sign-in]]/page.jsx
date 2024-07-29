import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="login"
            src="/image/interview-animate.svg"
            className=" pointer-events-none absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:py-12 lg:px-2 bg-transparent/20 rounded-xl">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
            </a>

            <div className="flex items-center gap-2">
              <h2 className=" text-2xl text-nowrap font-bold text-white sm:text-3xl md:text-3xl">
                Sign In to{" "}
              </h2>
              <div className="flex gap-3">
                {" "}
                <p className="text-sky-600 animate-bounce  text-4xl ">
                  Interview
                </p>
                <p className="bounce_opposite font-Dancing_Script text-4xl text-nowrap text-rose-500">
                  Mentor
                </p>{" "}
              </div>
            </div>

            <p className="mt-4 leading-relaxed text-white/90">
              Prepare for job interviews with our AI Interviewer App. Get
              tailored questions, practice your responses, and receive instant
              feedback to improve your chances of landing your dream job.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
