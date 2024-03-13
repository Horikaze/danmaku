import prisma from "@/app/lib/prismadb";
import { emptyScoreObjectString } from "@/app/lib/utils";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
export const authOptions: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
      authorization: { params: { scope: "identify" } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: `credentials`,
      credentials: {
        nickname: { label: `nickname`, type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.nickname || !credentials.password)
          throw new Error("Invalid credentials");
        const user = await prisma.profile.findUnique({
          where: {
            email: credentials?.nickname.replace(/\s/g, "_") + "@dmku.pl",
          },
        });

        if (!user || !user?.hashedPassword)
          throw new Error("Invalid credentials");

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isCorrectPassword) throw new Error("Invalid credentials");

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }
      if (user) {
        const isUserExists = await prisma.profile.findUnique({
          where: {
            email: user.email!,
          },
        });

        if (isUserExists) {
          token.picture = isUserExists?.imageUrl;
          token.name = isUserExists?.nickname;
          token.email = isUserExists?.email;
          token.info = isUserExists!;
        }

        if (!isUserExists) {
          const newUser = await prisma.profile.create({
            data: {
              id: nanoid(10),
              email: user.email!,
              nickname: user.name!,
              name: user.name!,
              imageUrl: user.image || null,
            },
          });
          const userRanking = await prisma.ranking.create({
            data: {
              DDC: emptyScoreObjectString,
              EOSD: emptyScoreObjectString,
              GFW: emptyScoreObjectString,
              HSIFS: emptyScoreObjectString,
              IN: emptyScoreObjectString,
              LOLK: emptyScoreObjectString,
              MOF: emptyScoreObjectString,
              PCB: emptyScoreObjectString,
              POFV: emptyScoreObjectString,
              SA: emptyScoreObjectString,
              TD: emptyScoreObjectString,
              UM: emptyScoreObjectString,
              UFO: emptyScoreObjectString,
              WBAWC: emptyScoreObjectString,
              userIdRankingPoints: newUser.id,
            },
          });

          token.picture = newUser?.imageUrl;
          token.name = newUser?.nickname;
          token.email = newUser?.email;
          token.info = newUser!;
        }
      }
      return token;
    },
    session({ token, session }) {
      if (token) {
        session.user.info = token.info;
      }
      return session;
    },
  },

  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
