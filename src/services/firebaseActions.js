import { db, auth } from "../services/firebase";
import { doc, getDoc, runTransaction, collection, addDoc, getDocs, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { toast } from 'react-toastify';

const auth = getAuth();

// CREAR SECRETO CON VALIDACIÓN
export const submitSecret = async ({ text, age, country, acceptedTerms, sex, name }) => {

  if (text.trim() === "") {
    toast.warn("Debes escribir un secreto", { theme: "dark", autoClose: 1500 });
    return;
  }

  if (Number(age) < 18 || isNaN(Number(age))) {
    toast.warn("Debes ser mayor de edad", { theme: "dark", autoClose: 1500 });
    return;
  }

  if (!country.trim()) {
    toast.warn("Debes ingresar un país.", { theme: "dark", autoClose: 1500 });
    return;
  }

  if (!sex) {
    toast.warn("Debes seleccionar tu sexo.", { theme: "dark", autoClose: 1500 });
    return;
  }

  if (!acceptedTerms) {
    toast.warn("Debes aceptar los Términos y Condiciones", { theme: "dark", autoClose: 1500 });
    return;
  }

  const finalName = name.trim() === "" ? "ANÓNIMO" : name.trim();

  const counterRef = doc(db, "counters", "secretsCounter");

  try {
    const secretNumber = await runTransaction(db, async (transaction) => {
      const counterDoc = await transaction.get(counterRef);

      if (!counterDoc.exists()) {
        transaction.set(counterRef, { lastNumber: 1 });
        return 1;
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

// INICIO DE SESION
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      toast.success(`Sesión iniciada correctamente`, { theme: 'dark', autoClose: 1500 });
      return user;
    })
    .catch((error) => {
      toast.error('Email o contraseña incorrecta', { theme: 'dark', autoClose: 1500 });
      throw error;
    });
};

// INICIO DE SESIÓN CON GOOGLE
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      // En móviles usamos redirect
      await signInWithRedirect(auth, provider);
      // El resultado se obtiene cuando la app recarga después del redirect
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user;
        toast.success(`Bienvenido ${user.displayName || user.email}`, { theme: 'dark', autoClose: 2000 });
        return user;
      }
    } else {
      // En escritorio seguimos usando popup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success(`Bienvenido ${user.displayName || user.email}`, { theme: 'dark', autoClose: 2000 });
      return user;
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    toast.error("No se pudo iniciar sesión con Google", { theme: 'dark', autoClose: 2000 });
    throw error;
  }
};

// DATOS DEL PERFIL DEL USUARIO
export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");

  const provider = user.providerData[0]?.providerId;

  return {
    name: user.displayName || "Sin nombre",
    email: user.email,
    provider,
    password: "********",
    birthdate: ""
  };
};


// VER DESDE ACA //
export const createUserInFirestore = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.displayName || "",
    email: user.email,
    birthdate: ""
  });
};

// --- Actualizar fecha de nacimiento ---
export const updateBirthdate = async (birthdate) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");

  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { birthdate }, { merge: true });
};

// --- Actualizar nombre ---
export const updateUserName = async (name) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");

  // Actualizar en Auth
  await updateProfile(user, { displayName: name });

  // Actualizar en Firestore
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { name }, { merge: true });
};

// --- Actualizar contraseña ---
export const updateUserPassword = async (newPassword) => {
  const user = auth.currentUser;
  if (!user) throw new Error("No hay usuario autenticado");

  await updatePassword(user, newPassword);
};