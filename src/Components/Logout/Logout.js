import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies([]);

  const handleLogout = () => {
    // console.log(cookies)
    // localStorage.setItem("authorization", "");
    setCookie("jwt", "");
    navigate("/login");
  };
  return (
    <>
      <button id="logoutBtn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
export default Logout;
