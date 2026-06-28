import "@/App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import Exercises from "@/pages/Exercises";
import Diet from "@/pages/Diet";
import Weight from "@/pages/Weight";
import Login from "@/pages/Login";

function Gate() {
  const { token } = useAuth();
  if (!token) return <Login />;
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/weight" element={<Weight />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <HashRouter>
          <Gate />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#FFFFFF",
                border: "1px solid #D6D3C4",
                color: "#2A2E26",
                fontFamily: "Manrope, sans-serif",
              },
            }}
          />
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
