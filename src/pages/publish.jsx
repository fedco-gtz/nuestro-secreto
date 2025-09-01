import { useEffect, useState } from "react";
import { loadSecrets, submitSecret } from "../services/firebaseActions.js";
import { toast } from 'react-toastify';
import '../styles/Publish.css'

function Publish() {
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [text, setText] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [sex, setSex] = useState("");
  const [name, setName] = useState("");

  const fetchSecrets = async () => {
    try {
      const { approved, pending } = await loadSecrets();
      setApproved(approved);
      setPending(pending);
    } catch (error) {
      console.error("Error cargando secretos: ", error);
    }
  };

  useEffect(() => {
    fetchSecrets();
  }, []);

  const handleSubmit = async () => {
    if (!acceptedTerms) {
      toast.error("Debes aceptar los Términos y Condiciones", {
        theme: "dark",
        autoClose: 1500,
      });
      return;
    }

    try {
      await submitSecret({ text, age, country, acceptedTerms, sex, name });

      setText("");
      setAge("");
      setCountry("");
      setAcceptedTerms(false);
      setSex("");
      setName("");

      toast.success("¡Tu secreto fue publicado con éxito!", {
        theme: "dark",
        autoClose: 1500,
      });

      fetchSecrets();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="publish-container">
      <h2>PUBLICAR TU SECRETO</h2>

      <label>NOMBRE</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="OPCIONAL"
      />
      <br />

      <label>EDAD</label>
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="TENES QUE SER MAYOR DE EDAD"
      />
      <br />

      <label>PAÍS</label>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="ARGENTINA, URUGUAY, ETC."
      />
      <br />

      <label>SEXO</label>
      <select value={sex} onChange={(e) => setSex(e.target.value)}>
        <option value="">--Selecciona--</option>
        <option value="Masculino">MASCULINO</option>
        <option value="Femenino">FEMENINO</option>
        <option value="No binario">NO BINARIO</option>
        <option value="Prefiero no decir">PREFIERO NO DECIR</option>
      </select>
      <br />

      <label>SECRETO</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", height: "80px" }}
      />
      <br />

      <label>
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
        />{" "}
        ACEPTO LOS TÉRMINOS Y CONDICIONES
      </label>
      <br />

      <button onClick={handleSubmit}>ENVIAR</button>
    </div>
  );
}

export default Publish;
