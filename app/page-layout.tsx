import React from "react";

import { PageHeader } from "~/shared/components/page-header/page-header";
import { useReadUserCurrentUserGet } from "~/types/client-api";

type Props = {
  children?: React.ReactNode;
};

export const PageLayout = ({ children }: Props) => {
  const { data } = useReadUserCurrentUserGet();

  return (
    <div>
      <PageHeader userData={data} />
      <div className="mx-auto max-w-7xl py-12">{children}</div>
    </div>
  );
};
