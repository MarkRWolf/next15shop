import { getAllGlobals } from "@/sanity/lib/lang/getAllGlobals";
import { Language } from "../../../../sanity.types";
import About from "@/components/about/About";

const AboutPage = async () => {
  const globalLangs: Language[] = await getAllGlobals();

  return <About globals={globalLangs} />;
};

export default AboutPage;
