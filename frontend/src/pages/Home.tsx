
function Home() {
  async function handleAuth() {
    try {
      const response = await fetch("http://localhost:3000/getAuthUrl");
      const data = await response.json();
      if (!data.authUrl) {
        throw new Error("Authentication URL not found");
      }
      window.open(data.authUrl, "_blank");
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Authentication failed. Please try again.");
    }
  }
  return (
    <>
      <button onClick={handleAuth}>Google Auth</button>
    </>
  );
}

export default Home;
