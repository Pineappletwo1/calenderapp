import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import TyeeCalendarUser from "@/models/user";
import { getServerSession } from "next-auth";
import Tag from "@/components/Tag";
import TagAdder from "@/components/TagAdder";

export default async function SubscribeTags() {
  await connectToDataBase();
  const session = await getServerSession();
  if (!session) {
    return <h1>Be logged in to do this feature!</h1>;
  }
  const user = await TyeeCalendarUser.findOne({ email: session?.user?.email });
  if (!user) {
    return <h1>Be logged in to do this feature!</h1>;
  }
  const userTags = user.tags;

  return (
    <div className="p-6">
      <h1 className="text-4xl">Tag Management</h1>
      <h2 className="text-2xl mt-4">Remove your current tags</h2>
      <div className="flex gap-2 mt-4">
        {userTags.map((tag, index) => {
          return <Tag tag={tag} i={index} tags={user.tags} userExists={true} />;
        })}
      </div>
      <h2 className="text-2xl mt-4">Add new tags</h2>
      <TagAdder />
    </div>
  );
}
