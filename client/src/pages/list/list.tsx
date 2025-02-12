import { Preloader } from "@/components/ui/preloader";
import { RequestStatus } from "@/utils/types";
import { FC, useState } from "react";

export const ListPage: FC = () => {
  const [loading, setLoading] = useState("loading");

  return (
    <>
      {loading === RequestStatus.LOADING ? (
        <Preloader />
      ) : (
        <main>
          <h2>Список объявлений</h2>
        </main>
      )}
    </>
  );
};
