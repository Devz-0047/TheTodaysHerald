import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="max-w-screen-xl mx-auto">
        <div>
          <Toaster
            position="top-left"
            toastOptions={{ style: { background: "#f1f3f5" } }}
          />
        </div>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div>

      <Footer/>
      </div>
      </div>
      
    </BrowserRouter>
  );
}

/* <h1 className="font-sans text-xl">This text uses Roboto or Open Sans.</h1>
      <p className="font-serif text-lg">
        This text uses Georgia or Merriweather. */
