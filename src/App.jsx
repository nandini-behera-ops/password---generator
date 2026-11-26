import { useCallback, useEffect, useState } from "react";

// import "./App.css";

function App() {
  const [length, setLength] = useState(4);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }

    if (charAllowed) {
      str += "!@#$%^&*()_+-=[]{}|;:',.<>?/`~";
    }

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-md p-6 mx-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">
          Password Generator
        </h1>

        {/* Password Input + Copy Button */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Generated password"
            readOnly
            value={password}
            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg outline-none focus:border-blue-500"
          />
          <div className="relative">
            <button
              onClick={() => {
                navigator.clipboard.writeText(password).then(() => {
                  document.getElementById("copyMessage").innerText =
                    "Copied to clipboard!";
                });
              }}
              className="px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Copy
            </button>
            <p
              id="copyMessage"
              className="absolute bottom-full mb-2 right-0 text-xs text-green-400 whitespace-nowrap"
            ></p>
          </div>
        </div>

        {/* Password Length Range */}
        <div className="mt-5">
          <div className="flex justify-between mb-2">
            <label className="text-white">Password Length</label>

            <span className="text-blue-400 font-semibold">{length}</span>
          </div>

          <input
            type="range"
            min="8"
            max="100"
            className="w-full accent-blue-500 cursor-pointer"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>

        {/* Checkboxes */}
        <div className="flex items-center justify-between mt-5">
          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              onChange={() => setNumberAllowed((prev) => !prev)}
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
            />
            Add Number
          </label>

          <label className="flex items-center gap-2 text-white cursor-pointer">
            <input
              onChange={() => setCharAllowed((prev) => !prev)}
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
            />
            Add Character
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
