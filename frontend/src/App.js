import { useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Contact Management App</h2>

      <ContactForm onAdd={() => setRefresh(!refresh)} />
      <hr />
      <ContactList refresh={refresh} />
    </div>
  );
}
export default App;