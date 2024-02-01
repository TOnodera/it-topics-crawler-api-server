import { PrismaClient } from "@prisma/client";
import { SITES } from "@/config";

export const siteSeeder = async (client: PrismaClient) => {
  for (const key in SITES) {
    const data = SITES[key];
    await client.site.create({ data: { id: data.id, name: data.name } });
  }
};
