import { db } from "./firebase";
import { doc, getDoc, runTransaction, collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

// CREAR SECRETO CON VALIDACIÓN
export const submitSecret = async ({ text, age, country, acceptedTerms, sex, name }) => {

  if (text.trim() === "") {
    toast.warn("Debes escribir un secreto", {
      theme: "dark",
      autoClose: 1500,
    });
    return;
  }

  if (Number(age) < 18 || isNaN(Number(age))) {
    toast.warn("Debes ser mayor de edad", {
      theme: "dark",
      autoClose: 1500,
    });
    return;
  }

  if (!country.trim()) {
    toast.warn("Debes ingresar un país.", {
      theme: "dark",
      autoClose: 1500,
    });
    return;
  }

  if (!sex) {
    toast.warn("Debes seleccionar tu sexo.", {
      theme: "dark",
      autoClose: 1500,
    });
    return;
  }

  const finalName = name.trim() === "" ? "ANÓNIMO" : name.trim();

  const counterRef = doc(db, "counters", "secretsCounter");

  try {
    const secretNumber = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists()) {
        transaction.set(counterRef, { lastNumber: 0 });
        return 0;
      }

      const newNumber = counterDoc.data().lastNumber + 1;
      transaction.update(counterRef, { lastNumber: newNumber });
      return newNumber;
    });

    const newSecret = await addDoc(collection(db, "secrets"), {
      number: secretNumber,
      text,
      age: Number(age),
      country: country.trim(),
      acceptedTerms,
      sex,
      name: finalName,
      votes: 0,
      approved: false,
    });

    return newSecret.id;
  } catch (e) {
    console.error("Error creando secreto: ", e);
    throw new Error("No se pudo crear el secreto.");
  }
};

// CARGAR SECRETOS
export const loadSecrets = async () => {
  const snapshot = await getDocs(collection(db, "secrets"));
  const secrets = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  return {
    approved: secrets.filter((s) => s.approved),
    pending: secrets.filter((s) => !s.approved),
  };
};

// MODERAR SECRETO
export const voteSecret = async (id, userIP) => {
  if (!userIP) throw new Error("No se pudo obtener la IP del dispositivo.");

  const secretRef = doc(db, "secrets", id);
  const snap = await getDoc(secretRef);

  if (snap.exists()) {
    const data = snap.data();

    if (data.votersIPs && data.votersIPs.includes(userIP)) {
      throw new Error("Este dispositivo ya votó este secreto.");
    }

    const newVotes = (data.votes || 0) + 1;
    let updateData = {
      votes: newVotes,
      votersIPs: arrayUnion(userIP),
    };

    if (newVotes >= 50 && !data.approved) {
      updateData.approved = true;
      updateData.approvedAt = serverTimestamp();
    }

    await updateDoc(secretRef, updateData);
  } else {
    throw new Error("El secreto no existe.");
  }
};