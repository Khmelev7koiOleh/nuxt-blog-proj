import { DB_ID, COLLECTION_BLOGS } from "~/app.constants";

import { useQuery } from "@tanstack/vue-query";
import { ID } from "appwrite";

import { DB } from "~/lib/appwrite";
export function useKannbanQuery() {
  return useQuery({
    queryKey: ["blogs", ID],
    queryFn: () => DB.createDocument,
  });
}
