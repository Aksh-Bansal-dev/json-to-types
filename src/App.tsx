import { useState } from "react";
import "./App.css";
import { jsonToTypes } from "./jsonToTypes";

function App() {
  const [json, setJson] = useState("");

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => setJson(e.target.value)}
        value={json}
      />
      <br />
      <textarea
        disabled
        style={{ height: "50vh", width: "75vw" }}
        value={jsonToTypes(json)}
      ></textarea>
    </div>
  );
}

export default App;
