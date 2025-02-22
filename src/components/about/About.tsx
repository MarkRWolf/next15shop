"use client";
import useText from "@/hooks/useText";
import { Language } from "../../../sanity.types";
import { arrayFromNewLines } from "@/utils/stringUtils";

interface AboutProps {
  aboutText: Language[];
  examplesText: Language[];
}

const About = ({ aboutText, examplesText }: AboutProps) => {
  const about = useText(aboutText, "chap", "chapters");
  const examples = useText(examplesText, "exampleTitle", "chapters");
  const secTitle = useText(examplesText, "secTitle", "single");

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
        <div className="space-y-12 text-3xl pt-4">
          {secTitle}
          {examples?.length
            ? examples.map((ex, index) => (
                <div key={index} className="space-y-4 first:mt-4">
                  <h2 className="text-xl">{ex}</h2>
                  <video controls className="w-full" muted>
                    <source src={`/example_${index + 1}.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default About;
