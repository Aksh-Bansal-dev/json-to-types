import { useState } from "react";
import "./App.css";
import { jsonStringToTypes } from "./jsonToTypes";

function App() {
  const [json, setJson] = useState("");

  return (
    <div className="App">
      <textarea
        onChange={(e) => setJson(e.target.value)}
        style={{ height: "30vh", width: "75vw" }}
        value={json}
      />
      <br />
      <textarea
        disabled
        style={{ height: "50vh", width: "75vw" }}
        value={jsonStringToTypes("ObjTypes", json)}
      ></textarea>
    </div>
  );
}

export default App;
