import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
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
      <h1>SECRETOS PUBLICADOS</h1>
      {approved.map((s) => (
        <div key={s.id} className={`secret-card ${getSexClass(s.sex)}`}>
          <span className="secret-id">{s.age} años</span>
          <span className="secret-id">
            #{String(s.number).padStart(6, "0")}
          </span>
          <span className="secret-id"> {s.country} </span>
          <hr></hr>
          <span className="secret-id"> {s.text} </span>
          {s.content}
        </div>
        
      ))}
    </div>
  );
}

export default Published;
