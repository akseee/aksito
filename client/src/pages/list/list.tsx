import { Preloader } from "@ui";
import { FC, useState } from "react";
import { RequestStatus } from "src/utils/types";

export const ListPage: FC = () => {
  const [loading, setLoading] = useState("success");

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
