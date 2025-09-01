import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { submitSecret } from "../services/firebaseActions";
import '../styles/Published.css'

function Published() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [text, setText] = useState("");

  const loadSecrets = async () => {
    const snapshot = await getDocs(collection(db, "secrets"));
    const secrets = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setApproved(secrets.filter((s) => s.approved));
    setPending(secrets.filter((s) => !s.approved));
  };

  useEffect(() => {
    loadSecrets();
  }, []);

  const handleSubmit = async () => {
    if (text.trim() === "") return;
    await submitSecret(text);
    setText("");
    loadSecrets();
  };

  // función para dar "me gusta"
  const handleLike = async (id) => {
    const ref = doc(db, "secrets", id);
    await updateDoc(ref, { likes: increment(1) });
    loadSecrets(); // recargar para mostrar el nuevo valor
  };

  // función para compartir (puede usar navigator.share si está disponible)
  const handleShare = (secret) => {
    if (navigator.share) {
      navigator.share({
        title: "Mirá este secreto 🔥",
        text: secret.text,
        url: window.location.href,
      });
    } else {
      alert("Tu navegador no soporta compartir 😅");
    }
  };

  const getSexClass = (sex) => {
    switch (sex) {
      case "Masculino":
        return "secret-masculino";
      case "Femenino":
        return "secret-femenino";
      case "No binario":
        return "secret-nobinario";
      default:
        return "secret-indefinido";
    }
  };

  return (
    <div className="published-container">
      <h1 className="mobile">SECRETOS PUBLICADOS</h1>
      {approved.map((s) => (
        <div key={s.id} className={`secret-card secret-header ${getSexClass(s.sex)}`}>

          <span className="secret-id secred-card-info">{s.age} AÑOS</span>
          <span className="secret-id secred-card-info"> #{String(s.number).padStart(6, "0")}</span>
          <span className="secret-id secred-card-info"> {s.country} </span>
          <hr className={`hr ${getSexClass(s.sex)}`} />
          <span className="secret-id"> {s.text} </span>
          {s.content}
          <div className="secret-actions">
            <button onClick={() => handleLike(s.id)} className="like-btn">❤︎ {s.likes || 0}</button>
            <br />
            <button onClick={() => handleShare(s)} className="share-btn">↪ Compartir</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Published;
