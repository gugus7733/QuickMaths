import { useEffect, useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [username, setUsername] = useState("");
  const [userColor, setUserColor] = useState("#ffffff");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedColor = localStorage.getItem("userColor");
    if (storedUsername) setUsername(storedUsername);
    if (storedColor) setUserColor(storedColor);
    
  }, []);

  function handleSetUsername(name, color) {
    setUsername(name);
    setUserColor(color);
    localStorage.setItem("username", name);
    localStorage.setItem("userColor", color);
  }

  return (
    <div>
      {!username ? (
        <div className="username-form">
          <div className="greeting">Bienvenue sur QuickMaths !</div>
          <input
            type="text"
            placeholder="Votre pseudo"
            maxLength="14" // Limite la longueur à 16 caractères
            id="username-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim()) {
                const color = document.getElementById("color-input").value;
                handleSetUsername(e.target.value.trim(), color);
              }
            }}
          />
          <input
            type="color"
            id="color-input"
            defaultValue="#ffffff"
            style={{ marginTop: "10px" }}
          />
        </div>
      ) : (
        <Component {...pageProps} username={username} userColor={userColor} />
      )}
    </div>
  );
}


export default MyApp;
