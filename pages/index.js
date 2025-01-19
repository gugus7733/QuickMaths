"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ username, userColor }) {
  const titleRef = useRef(null);

  // Position absolue du titre
  const [pos, setPos] = useState({ x: 100, y: 100 });
  // Vitesse linéaire
  const [vel, setVel] = useState({ x: 0, y: 0 });
  // Angle et vitesse de rotation
  const [angle, setAngle] = useState(0);
  const [angularVel, setAngularVel] = useState(0);
  // Pour afficher les options
  const [showOptions, setShowOptions] = useState(false);

  // Initialisation de la position (centrée)
  useEffect(() => {
    const handleResize = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        setPos({
          x: (window.innerWidth - rect.width) / 2 - 30,
          y: (window.innerHeight - rect.height) / 2 - 80,
        });
      }
    };

    // Centrer à l'initialisation
    handleResize();

    // Recentrer si la fenêtre est redimensionnée
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Boucle d'animation : inertie + rebonds + rotation
  useEffect(() => {
    let frameId;
    function animate() {
      // 1) Position
      setPos(old => {
        let nx = old.x + vel.x;
        let ny = old.y + vel.y;

        const w = window.innerWidth - (titleRef.current?.offsetWidth || 200);
        const h = window.innerHeight - (titleRef.current?.offsetHeight || 80);

        // Rebonds horizontaux
        if (nx < 0) {
          nx = 0;
          setVel(v => ({ ...v, x: -v.x * 0.6 }));
        } else if (nx > w) {
          nx = w;
          setVel(v => ({ ...v, x: -v.x * 0.6 }));
        }

        // Rebonds verticaux
        if (ny < 0) {
          ny = 0;
          setVel(v => ({ ...v, y: -v.y * 0.6 }));
        } else if (ny > h) {
          ny = h;
          setVel(v => ({ ...v, y: -v.y * 0.6 }));
        }

        return { x: nx, y: ny };
      });

      // 2) Rotation
      setAngle(a => a + angularVel);

      // 3) Friction (linéaire + angulaire)
      setVel(v => ({
        x: v.x * 0.99,
        y: v.y * 0.99,
      }));
      setAngularVel(av => av * 0.99);

      frameId = requestAnimationFrame(animate);
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [vel, angularVel]);

  // Un tap sur le titre => “pousse” + rotation
  function handlePointerDown(e) {
    const rect = titleRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Vecteur (centre -> pointeur) inversé pour "pousser" le titre hors du doigt
    const dxVel = centerX - e.clientX;
    const dyVel = centerY - e.clientY;
    setVel({ x: dxVel * 0.3, y: dyVel * 0.3 });

    // Pour la rotation, on peut utiliser la distance horizontale
    // (si on tape à droite du centre, ça tourne dans un sens, à gauche dans l'autre)
    const dx = e.clientX - centerX;
    setAngularVel(dx * 0.2);
  }

  function handleShowOptions() {
    setShowOptions((prev) => !prev);
  }

  function handlePersonalize() {
    localStorage.removeItem("username");
    localStorage.removeItem("userColor");
    window.location.reload();
  }

  return (
    <div className={styles.menuContainer}>

      <div className={styles.welcome}>
        <p className={styles.greeting}>
          Bonjour{" "}
          <span
            className={styles.username}
            style={{ color: userColor }}
            onClick={handleShowOptions}
          >
            {username}
          </span>
          ,
          <br />
          bienvenue sur
        </p>
        {showOptions && (
          <div className={styles.options}>
            <button onClick={handlePersonalize}>Personnaliser le pseudo</button>
            <Link href="./modes/stats">
              <button>Afficher mes scores</button>
            </Link>
          </div>
        )}
        <h1 className={styles.dynamicTitle}></h1>
        <h1 className={styles.dynamicTitle}></h1>
        <h1 className={styles.dynamicTitle}></h1>
        </div>

      <h1
        ref={titleRef}
        className={styles.menuTitle}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "center"
        }}
        onPointerDown={handlePointerDown}
      >
        QuickMaths
      </h1>

      <Link href="/modes/addition">
        <button className={styles.menuButton}>Additions</button>
      </Link>
      <Link href="/modes/multiplication">
        <button className={styles.menuButton}>Tables de Multiplication</button>
      </Link>
      <Link href="/modes/randomMultiplication">
        <button className={styles.menuButton}>Multiplications</button>
      </Link>
    </div>
  );
}
