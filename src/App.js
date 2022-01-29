import React, { useState, useEffect } from "react";
import Admin from "pages/admin/Index";
import PublicLayout from "layouts/PublicLayout";
import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import Vehicles from "pages/admin/Vehicles";
import Clients from "pages/admin/Clients";
import Index from "pages/Index";
import Login from "pages/auth/Login";
import Register from "pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import { DarkModeContext } from "context/darkMode";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("dark mode:", darkMode);
  }, [darkMode]);

  return (
    <div className="App">
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Router>
          <Switch>
            <Route path={["/admin", "/admin/vehicles", "admin/clients"]}>
              <PrivateLayout>
                <Switch>
                  <Route path="/admin/vehicles">
                    <Vehicles />
                  </Route>
                  <Route path="/admin/clients">
                    <Clients />
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
                <Switch>
                  <Route path="/">
                    <Index />
                  </Route>
                </Switch>
              </PublicLayout>
            </Route>
          </Switch>
        </Router>
      </DarkModeContext.Provider>
    </div>
  );
}
export default App;
