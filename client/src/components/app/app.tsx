import {
  FormEditPage,
  ItemPage,
  ListPage,
  LoginPage,
  NotFound404,
} from "@pages";

import styles from "./app.module.css";

import { Route, Routes } from "react-router-dom";
import { AppHeader } from "@components";

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      <Routes>
        <Route path="*" element={<NotFound404 />} />
        <Route path="/" element={<ListPage />} />
        <Route path="/form" element={<FormEditPage />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/*    <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
