"use client";
import { useParams, useRouter } from "next/navigation";

import { useOrigin } from "@/hooks/use-origin";
import { APiAlert } from "./api-alert";

interface AppListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: React.FC<AppListProps> = ({
  entityName,
  entityIdName,
}) => {
  const params = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${params.storeId}`;

  return (
    <>
      <APiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <APiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <APiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <APiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <APiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  );
};
