import SuccessWrapper from "@/components/success/SuccessWrapper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const SuccessPage = async () => {
  const successTexts = await getLocalizedTexts("success");
  return <SuccessWrapper texts={successTexts} />;
};

export default SuccessPage;
