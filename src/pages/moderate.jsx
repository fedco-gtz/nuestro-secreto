import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { voteSecret } from "../services/firebaseActions";
import "../styles/Moderate.css";

function Moderate() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);

  const loadSecrets = async () => {
    const snapshot = await getDocs(collection(db, "secrets"));
    const secrets = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setApproved(secrets.filter((s) => s.approved));
    setPending(secrets.filter((s) => !s.approved));
  };

  useEffect(() => {
    loadSecrets();
  }, []);

  const getUserIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch (e) {
      console.error("No se pudo obtener la IP", e);
      return null;
    }
  };

  const handleVote = async (secretId) => {
    const ip = await getUserIP();
    if (!ip) {
      alert("No se pudo obtener tu IP. Intenta nuevamente.");
      return;
    }

    try {
      await voteSecret(secretId, ip);
      alert("¡Tu voto fue registrado!");
      loadSecrets();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="moderate-container">
      <h1 className="mobile">SECRETOS PENDIENTES DE APROBACIÓN</h1>
      {pending.map((s) => (
        <div key={s.id} className="secret-card">
          <span className="secret-id">
            #{String(s.number).padStart(6, "0")}
          </span>
          <span className="secret-content">
            ESCRITO POR: {s.name} | {s.age} AÑOS | {s.sex} | {s.country}
          </span>
          <span className="secret-content">SECRETO:</span>
          <span className="secret-content">{s.text}</span>
          <button
            className="vote-btn"
            onClick={() => handleVote(s.id)}
          >
            Votar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Moderate;

