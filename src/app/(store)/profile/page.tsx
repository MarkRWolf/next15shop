import { getLocalizedTexts } from "@/sanity/lib/lang/getLocalizedTexts";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);
  const ordersText = await getLocalizedTexts("orders");

  return (
    <div className="w-full max-w-7xl mx-auto flex gap-1">
      <h2>Denne side eksisterer ikke endnu, men du kan stadig se dine ordrer </h2>
      <Link className="font-bold" href={"/profile/orders"}>
        Her
      </Link>
    </div>
  );
};

export default ProfilePage;
