import {
  FormEditPage,
  FormPublishPage,
  ItemPage,
  ListPage,
  LoginPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
} from "@pages";

import styles from "./app.module.css";

import { Route, Routes } from "react-router-dom";
import { AppHeader } from "@components";
import { MainWrapper } from "@ui";
import { UserProvider } from "src/context/UserContext";
import { ProtectedRoute } from "src/utils/ProtectedRoute";

const App = () => {
  return (
    <div className={styles.app}>
      <UserProvider>
        <AppHeader></AppHeader>
        <MainWrapper>
          <Routes>
            <Route path="*" element={<NotFound404 />} />
            <Route path="/" element={<ListPage />} />
            <Route path="/form">
              <Route
                index
                path="edit"
                element={
                  <ProtectedRoute>
                    <FormEditPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="publish"
                element={
                  <ProtectedRoute>
                    <FormPublishPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="/item/:id" element={<ItemPage />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute onlyUnAuth>
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute onlyUnAuth>
                  <RegisterPage></RegisterPage>
                </ProtectedRoute>
              }
            />
            <Route
              path="/forgor-password"
              element={
                <ProtectedRoute onlyUnAuth>
                  <div>forgor psssword page</div>
                </ProtectedRoute>
              }
            />
            <Route path="/profile">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="my-aksito"
                element={
                  <ProtectedRoute>
                    <div>/my-aksito route</div>
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </MainWrapper>
      </UserProvider>
    </div>
  );
};

export default App;
