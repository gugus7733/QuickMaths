import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";

// Configuration Firebase (remplace par tes valeurs)
const firebaseConfig = {
  apiKey: "AIzaSyD7AIgwiYs-Pred2NOxIoIP5unUR7IcYuY",
  authDomain: "quickmaths-f5160.firebaseapp.com",
  projectId: "quickmaths-f5160",
  storageBucket: "quickmaths-f5160.firebasestorage.app",
  messagingSenderId: "729663840102",
  appId: "1:729663840102:web:d8f5778bed8e0d1cd5b2a7",
  measurementId: "G-74QMRB1QN3"
};

// Initialise Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase initialisé :", app.name);
const db = getFirestore(app);

export async function getCollectionData() {
    console.log("getCollectionData a été appelée !");
    try {
      const ScoresCollection = collection(db, "Scores");
      const querySnapshot = await getDocs(ScoresCollection);
  
      if (querySnapshot.empty) {
        console.log("La collection 'Scores' est vide.");
        return;
      }
  
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error("Erreur dans getCollectionData :", error);
    }
  }
  
export async function getDocumentData(userId) {
console.log(`getDocumentData a été appelée pour l'utilisateur : ${userId}`);
try {
    const userDoc = doc(db, "Scores", userId);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
    console.log("Données utilisateur :", docSnap.data());
    } else {
    console.log(`Aucun document trouvé pour l'utilisateur : ${userId}`);
    }
} catch (error) {
    console.error("Erreur dans getDocumentData :", error);
}
}

export async function updateScore(pseudo, mode, difficulty, increment = 1) {
    try {
      const userRef = doc(db, "Scores", pseudo); // Référence au document de l'utilisateur
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        // Récupère les données existantes
        const data = userSnap.data();
        if (mode === "tables") {
          data[mode] += increment;
        } else {
            data[mode][difficulty] += increment;
        }
        
        // Met à jour le document
        await setDoc(userRef, data);
      } else {
        const newData = {
          pseudo: pseudo,
          additions: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          multiplications: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          tables: 0,
        };
        newData[mode][difficulty] = increment;
        await setDoc(userRef, newData);
      }
    } catch (error) {
    }
  }

export { db };
