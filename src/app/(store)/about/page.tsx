export const dynamic = "force-dynamic";

import About from "@/components/about/About";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const AboutPage = async () => {
  const aboutText = await getLocalizedTexts("about");

  return <About aboutText={aboutText} />;
};

export default AboutPage;
