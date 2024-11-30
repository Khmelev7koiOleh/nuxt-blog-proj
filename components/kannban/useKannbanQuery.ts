import { DB_ID, COLLECTION_BLOGS } from "~/app.constants";

import { useQuery } from "@tanstack/vue-query";
import { ID } from "appwrite";

import { DB } from "~/lib/appwrite";
import type { IBlog } from "~/pages/types/blog.types";
export function useKannbanQuery() {
  return useQuery({
    queryKey: ["blogs", ID],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_BLOGS),
    select: (data) => data.documents as unknown as IBlog[],
  });
}
