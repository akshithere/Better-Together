import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { BacktoTop } from "./components/shared";
import "./styles/App.css";
import "./styles/global.css";
import routesConfig from "./utils/routesConfig.jsx";

const App = () => {
  const queryClient = new QueryClient();
// convert this to react-router v6
  return (
    <QueryClientProvider client={queryClient}>
        <div className="app">
          <ToastContainer />
          <Suspense fallback={"Loading . . ."}>
            <Router>
              <Routes>
                {routesConfig.map((route, index) => (
                  <Route
                    key={index}
                    exact
                    path={route?.path}
                    element={route?.element}
                  />
                ))}
              </Routes>
            </Router>
          </Suspense>
          <BacktoTop />
        </div>
    </QueryClientProvider>
  );
};

export default App;
