import { useState, useRef } from "react";
import Form from "./components/Form";
import Result from "./components/Result";
import { generateEmailAPI } from "./services/api";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const handleGenerate = async (formData) => {
    try {
      setLoading(true);      // ✅ start loading
      setResult("");

      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      });

      const email = await generateEmailAPI(formData);

      setResult(email);
    } catch (err) {
      alert("Error generating email");
    } finally {
      setLoading(false);     // ✅ stop loading
    }
  };

  return (
    <div className="container">
      <h1>AI Email Generator</h1>
      <Form onSubmit={handleGenerate} />
      <div ref={resultRef}>
        <Result result={result} loading={loading} />
      </div>

    </div>
  );
}

export default App;