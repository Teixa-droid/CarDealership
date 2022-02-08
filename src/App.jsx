import React, { useState, useEffect } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Index from "pages/Index";
import Admin from "pages/admin/Index";
import Vehicles from "pages/admin/Vehicles";
import Login from "pages/auth/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import Register from "pages/auth/Register";
import AuthLayout from "layouts/AuthLayout";
import { DarkModeContext } from "context/darkMode";
import Sales from "pages/admin/Sales";
import { Auth0Provider } from "@auth0/auth0-react";
import Users from "pages/admin/Users";
import { UserContext } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log("modo dark:", darkMode);
  }, [darkMode]);

  return (
    <Auth0Provider
      domain="cardealership.eu.auth0.com"
      clientId="LalqgCiMbnpW8b4XAK1SNI0jqAKOyJ6d"
      redirectUri="http://localhost:3000/admin"
      audience="api-cardealership-autentication"
    >
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            <Router>
              <Switch>
                <Route
                  path={[
                    "/admin",
                    "/admin/vehicles",
                    "/admin/sales",
                    "/admin/users",
                  ]}
                >
                  <PrivateLayout>
                    <Switch>
                      <Route path="/admin/vehicles">
                        <PrivateRoute rolList={["admin"]}>
                          <Vehicles />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/sales">
                        <PrivateRoute rolList={["admin"]}>
                          <Sales />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/users">
                        <PrivateRoute rolList={["admin", "seller"]}>
                          <Users />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin">
                        <Admin />
                      </Route>
                    </Switch>
                  </PrivateLayout>
                </Route>
                <Route path={["/login", "/register"]}>
                  <AuthLayout>
                    <Switch>
                      <Route path="/login">
                        <Login />
                      </Route>
                      <Route path="/register">
                        <Register />
                      </Route>
                    </Switch>
                  </AuthLayout>
                </Route>
                <Route path={["/"]}>
                  <PublicLayout>
                    <Route path="/">
                      <Index />
                    </Route>
                  </PublicLayout>
                </Route>
              </Switch>
            </Router>
          </DarkModeContext.Provider>
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;
