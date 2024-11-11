import { Home } from "./pages/Home/Home";
import { ModalProvider } from "./components/Modal/ModalContextApi";

function App() {
  return (
    <>
      <ModalProvider>
        <Home />
      </ModalProvider>
    </>
  );
}

export default App;
