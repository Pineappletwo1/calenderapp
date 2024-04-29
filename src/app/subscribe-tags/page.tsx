import { connectToDataBase } from "@/lib/db";
import TyeeCalendarDay from "@/models/day";
import UI from "@/components/subscibe-tags";

export default async function SubscribeTags() {

      await connectToDataBase();

    return (
          <UI />
    );
}

