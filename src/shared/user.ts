import { isEqual } from "lodash";
import { useSession } from "next-auth/react";
export const CLIENT_ACCESS = ["EMTB-ADMIN", "EMTB-CLIENT"];
export const ADMIN_ACCESS = ["EMTB-ADMIN"];

export const CheckAdminAccess = () => {
  const { data: sessionData } = useSession();
  return sessionData
    ? ADMIN_ACCESS.includes(sessionData?.user?.role_type)
    : false;
};

export const CheckClientAccess = () => {
  const { data: sessionData } = useSession();
  return sessionData
    ? CLIENT_ACCESS.includes(sessionData?.user?.role_type)
    : false;
};

export const hasAccess = () => {
  const { data: sessionData } = useSession();
  return sessionData
    ? ADMIN_ACCESS.includes(sessionData?.user?.role_type)
    : false;
};

export const HasCommentAccess = (author_ID: number) => {
  const { data: sessionData } = useSession();
  return sessionData ? isEqual(sessionData?.user?.id, author_ID) : false;
};
