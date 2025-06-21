import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { backendUrl } from "./utils";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const code = searchParams.get("code");

      if (!code) {
        alert("Invalid code.");
        navigate("/");
        setIsLoading(false);
        return;
      }
      const userDataRes = await fetch(backendUrl + "/verifyAuth", {
        method: "POST",
        body: JSON.stringify({ code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await userDataRes.json();
      if (!userData.ok) {
        alert("Authentication failed. Please try again.");
        navigate("/");
        setIsLoading(false);
        return;
      }
      localStorage.setItem("userData", JSON.stringify(userData.userinfo));
      navigate("/profile");
    })();
  }, [searchParams, navigate]);

  return (
    <>
      <div>{isLoading ? "Loading..." : "Authentication Failed"}</div>
    </>
  );
}
