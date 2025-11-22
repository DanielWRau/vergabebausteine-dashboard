import { Refine, Authenticated } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  AuthPage,
  ErrorComponent,
  ThemedLayout,
  useNotificationProvider,
} from "@refinedev/antd";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { App as AntdApp, ConfigProvider } from "antd";
import { appwriteClient } from "./utility/appwriteClient";
import { authProvider } from "./authProvider";

import "@refinedev/antd/dist/reset.css";

// Appwrite Database and Collection IDs
// You'll need to create these in your Appwrite console
const APPWRITE_DATABASE_ID = "main"; // Replace with your database ID
const APPWRITE_USERS_COLLECTION_ID = "users"; // Replace with your collection ID

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ConfigProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider(appwriteClient, {
                databaseId: APPWRITE_DATABASE_ID,
              })}
              liveProvider={liveProvider(appwriteClient, {
                databaseId: APPWRITE_DATABASE_ID,
              })}
              authProvider={authProvider}
              routerProvider={routerBindings}
              notificationProvider={useNotificationProvider}
              resources={[
                {
                  name: APPWRITE_USERS_COLLECTION_ID,
                  list: "/users",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                  show: "/users/show/:id",
                  meta: {
                    label: "Users",
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                liveMode: "auto",
                projectId: "vergabebausteine-Rd7BAF",
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayout>
                        <Outlet />
                      </ThemedLayout>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource resource="users" />} />
                  <Route path="/users">
                    <Route index element={<div>Users List</div>} />
                    <Route path="create" element={<div>Create User</div>} />
                    <Route path="edit/:id" element={<div>Edit User</div>} />
                    <Route path="show/:id" element={<div>Show User</div>} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        formProps={{
                          initialValues: {
                            email: "test@vergabebausteine.de",
                            password: "password123",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<AuthPage type="register" />}
                  />
                  <Route
                    path="/forgot-password"
                    element={<AuthPage type="forgotPassword" />}
                  />
                  <Route
                    path="/reset-password"
                    element={<AuthPage type="updatePassword" />}
                  />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
