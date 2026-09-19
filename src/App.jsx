import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />

      <main className="w-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  ) : (
    <div className="bg-mesh grid min-h-screen place-items-center">
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-300" />
    </div>
  );
}

export default App;
