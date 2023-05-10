import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer, Header, MainContainer } from "./Components";
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <BrowserRouter>
          <header>
            <Header />
          </header>
          <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/" element={<MainContainer />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </BrowserRouter>
      </div>
    </AnimatePresence>
  );
}

export default App;
