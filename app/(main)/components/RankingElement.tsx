import ProfileImage from "@/app/mainComponents/ProfileImage";
import { RankingUser } from "@/app/types/Replay";
import { motion } from "framer-motion";
import Link from "next/link";

type RankingElementProps = {
  idx: number;
  user: RankingUser;
};

export default function RankingElement({ idx, user }: RankingElementProps) {
  return (
    <Link href={`/profile/${user.id}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: idx * 0.08 }}
        className="w-full flex gap-x-2 items-center relative bg-background p-2 rounded-md hover:bg-hover transition-colors"
      >
        <p className="w-5 text-center">{idx + 1}.</p>
        <div className="bg-primary relative overflow-hidden size-16 rounded-md">
          <ProfileImage imageUrl={user.imageUrl!} />
        </div>
        <div>{user.nickname}</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          {user.value.toLocaleString()}
        </div>
      </motion.div>
    </Link>
  );
}
