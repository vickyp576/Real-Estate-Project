import { Navigate } from "react-router-dom";
import { Cookies } from "react-cookie";

const Protected = ({ children }) => {
  const cookies = new Cookies();
  let token = cookies.get("jwt");
  if (token === undefined) {
    token = "";
  }

  return <>{token.length ? children : <Navigate to="/login" />}</>;
};
export default Protected;
