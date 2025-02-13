import SuccessWrapper from "@/components/success/SuccessWrapper";
import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";

const SuccessPage = async () => {
  const successTexts = await getLocalizedTexts("success");
  return (
    <div className="">
      <SuccessWrapper texts={successTexts} />
    </div>
  );
};

export default SuccessPage;
