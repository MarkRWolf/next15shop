"use client";
import useText from "@/hooks/useText";
import { Language } from "../../../sanity.types";
import { arrayFromNewLines } from "@/utils/stringUtils";

interface AboutProps {
  aboutText: Language[];
}

const About = ({ aboutText }: AboutProps) => {
  const about = useText(aboutText, "chap", "chapters");

  return about?.length ? (
    <div className="container-main w-full px-2 sm:px-0">
      <div className="w-full flex flex-col gap-2">
        {about?.map((chap, index) =>
          index === 0 ? (
            <h1 className="font-semibold text-lg pb-4 border-b border-slate-600" key={index}>
              {chap}
            </h1>
          ) : (
            <div key={index} className="pb-4 border-b border-slate-500">
              {arrayFromNewLines(chap)?.map((line, i) => <p key={i}>{line}</p>)}
            </div>
          )
        )}
      </div>
    </div>
  ) : null;
};

export default About;
