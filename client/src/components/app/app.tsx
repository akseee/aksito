import {
  FormEditPage,
  FormPublishPage,
  ItemPage,
  ListPage,
  LoginPage,
  NotFound404,
  PasswordRecoveryPage,
  ProfilePage,
  RegisterPage,
} from "@pages";

import styles from "./app.module.css";

import { Route, Routes } from "react-router-dom";
import { AppHeader } from "@components";
import { UserProvider } from "src/context/UserContext";
import { ProtectedRoute } from "src/utils/ProtectedRoute";

const App = () => {
  return (
    <div className={styles.app}>
      <UserProvider>
        <AppHeader></AppHeader>
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
            path="/forgot-password"
            element={
              <ProtectedRoute onlyUnAuth>
                <PasswordRecoveryPage />
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
      </UserProvider>
    </div>
  );
};

export default App;
