import Privacy from "@/components/privacy/Privacy";
import { Language } from "../../../../sanity.types";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const PrivacyPage = async () => {
  const privacyText: Language[] = await getLocalizedTexts("privacy");

  return <Privacy privacyText={privacyText} />;
};

export default PrivacyPage;
