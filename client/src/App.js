import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, ProtectedRoute, NoAccount } from "./pages";
import { About, Support, Register, SharedLayout, Home } from "./pages/landing";
import { Dashboard, Transfer, Accounts, MakeAccount } from "./pages/account";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/make-account"
            element={
              <ProtectedRoute>
                <MakeAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <NoAccount>
                  <Dashboard />
                </NoAccount>
              </ProtectedRoute>
            }
          >
            <Route index element={<Accounts />} />
            <Route path="/dashboard/transfer" element={<Transfer />} />
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
