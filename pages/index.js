"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  const titleRef = useRef(null);

  // Position absolue du titre
  const [pos, setPos] = useState({ x: 100, y: 100 });
  // Vitesse
  const [vel, setVel] = useState({ x: 0, y: 0 });
  // Flag poussée active
  const [pushing, setPushing] = useState(false);

  // Boucle d’animation : inertie + rebonds
  useEffect(() => {
    let frame;
    const loop = () => {
      // 1) Met à jour la position selon la vitesse
      setPos(old => {
        let nx = old.x + vel.x;
        let ny = old.y + vel.y;

        // Limites : largeur/hauteur de l’écran moins la taille du titre
        const w = window.innerWidth - (titleRef.current?.offsetWidth ?? 200);
        const h = window.innerHeight - (titleRef.current?.offsetHeight ?? 80);

        // Rebonds horizontaux
        if (nx < 0) {
          nx = 0;
          setVel(v => ({ ...v, x: -v.x * 0.7 })); // rebond + amortissement
        } else if (nx > w) {
          nx = w;
          setVel(v => ({ ...v, x: -v.x * 0.7 }));
        }

        // Rebonds verticaux
        if (ny < 0) {
          ny = 0;
          setVel(v => ({ ...v, y: -v.y * 0.7 }));
        } else if (ny > h) {
          ny = h;
          setVel(v => ({ ...v, y: -v.y * 0.7 }));
        }

        return { x: nx, y: ny };
      });

      // 2) Applique une friction légère (pour conserver un peu d’inertie)
      setVel(v => ({
        x: v.x * 0.99,
        y: v.y * 0.99,
      }));

      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [vel]);

  // onPointerDown n’importe où
  function handlePointerDown() {
    setPushing(true);
  }

  // onPointerUp n’importe où
  function handlePointerUp() {
    setPushing(false);
  }

  function handlePointerMove(e) {
    if (!pushing) return;

    // Vérifie si le pointeur est dans la zone du titre
    const rect = titleRef.current?.getBoundingClientRect();
    if (!rect) return;

    const { left, right, top, bottom, width, height } = rect;
    const inXRange = e.clientX >= left && e.clientX <= right;
    const inYRange = e.clientY >= top && e.clientY <= bottom;

    // S’il est dedans, on calcule un vecteur (centre → pointeur) et on l’ajoute à la vitesse
    if (inXRange && inYRange) {
      const cx = left + width / 2; 
      const cy = top  + height / 2;

      // Pousse le titre loin du pointeur
      setVel(v => ({
        x: v.x + (cx - e.clientX) * 0.3,
        y: v.y + (cy - e.clientY) * 0.3,
      }));
    }
  }

  return (
    <div
      className={styles.menuContainer}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <h1
        ref={titleRef}
        className={styles.menuTitle}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          userSelect: "none",
          // Pour éviter que le texte s’affiche en surbrillance au clic
          pointerEvents: "none" 
        }}
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
