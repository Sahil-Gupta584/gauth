import  { useEffect, useState } from "react";

type UserData = {
  name: string;
  email: string;
  picture: string;
};
export default function Profile() {
  const [userData, setUserData] = useState<null | UserData>(null);
  useEffect(() => {
    const userDataRes = localStorage.getItem("userData");
    if (!userDataRes) {
      alert("You are not authenticated. Please log in.");
      window.location.href = "/";
    } else {
      setUserData(JSON.parse(userDataRes));
    }
  }, []);
  return (
    <>
      <div>
        <h1>Profile</h1>
        {userData ? (
          <div>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <img src={userData.picture} alt="Profile" />
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </>
  );
}
