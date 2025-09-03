import { useEffect, useState } from "react";
import { getUserProfile, updateBirthdate, updateUserName, updateUserPassword } from "../services/firebaseActions.js";
import google from '../images/Google.png';
import '../styles/Published.css';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [birthdate, setBirthdate] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserProfile();
        setUser(data);
        setBirthdate(data.birthdate);
        setName(data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleBirthdateSave = async () => {
    try {
      await updateBirthdate(birthdate);
      alert("Fecha de nacimiento actualizada ✅");
    } catch (err) {
      console.error("Error actualizando:", err);
    }
  };

  const handleNameSave = async () => {
    try {
      await updateUserName(name);
      alert("Nombre actualizado ✅");
    } catch (err) {
      console.error("Error actualizando nombre:", err);
    }
  };

  const handlePasswordSave = async () => {
    try {
      await updateUserPassword(password);
      alert("Contraseña actualizada ✅");
      setPassword("");
    } catch (err) {
      console.error("Error actualizando contraseña:", err);
    }
  };

  if (!user) return <p>Cargando perfil...</p>;

  const isGoogleUser = user.provider === "google.com";

  return (
    <div className="published-container">
      <h1 className="mobile">MI PERFIL</h1>
      <div className="profile-card">
        {isGoogleUser && (
          <p className="profile-google">
            <img src={google} alt="Google" style={{ width: "20px", marginRight: "8px" }} />
            USUARIO LOGUEADO CON GOOGLE
          </p>
        )}

        <div className="birthdate-section profile-paragraf">
          <strong>NOMBRE</strong>
          {isGoogleUser ? (
            <span> {user.name}</span>
          ) : (
            <>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <button onClick={handleNameSave}>Guardar</button>
            </>
          )}
        </div>

        <p className="profile-paragraf">
          <strong>EMAIL</strong> {user.email}
        </p>

        <div className=" birthdate-section profile-paragraf">
          <strong>CONTRASEÑA</strong>
          {isGoogleUser ? (
            <span> ******** </span>
          ) : (
            <>
              <input 
                type="password" 
                placeholder="Nueva contraseña"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button onClick={handlePasswordSave}>Actualizar</button>
            </>
          )}
        </div>

        <div className="birthdate-section profile-paragraf">
          <label><strong>FECHA DE NACIMIENTO</strong></label>
          {isGoogleUser ? (
            <span>{birthdate || "No especificada"}</span>
          ) : (
            <>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
              <button onClick={handleBirthdateSave}>Guardar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
