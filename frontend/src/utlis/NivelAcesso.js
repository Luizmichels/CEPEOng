// utils/NivelAcesso.js
import { jwtDecode } from "jwt-decode";

export const NivelAcesso = () => {
  const token = localStorage.getItem("user_token");
  if (!token) {
    console.error("Token not found");
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken); // Adicione este log para verificar o token decodificado
    return decodedToken.nivel; // Ajuste este campo conforme necessário
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
