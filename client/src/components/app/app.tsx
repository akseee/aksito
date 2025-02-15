import {
  FormEditPage,
  FormPublishPage,
  ItemPage,
  ListPage,
  LoginPage,
  NotFound404,
} from "@pages";

import styles from "./app.module.css";

import { Route, Routes } from "react-router-dom";
import { AppHeader } from "@components";
import { MainWrapper } from "@ui";

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      <MainWrapper>
        <Routes>
          <Route path="*" element={<NotFound404 />} />
          <Route path="/" element={<ListPage />} />
          <Route path="/form/edit" element={<FormEditPage />} />
          <Route path="/form/publish" element={<FormPublishPage />} />
          <Route path="/item/:id" element={<ItemPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/*    <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>
      </MainWrapper>
    </div>
  );
};

export default App;
