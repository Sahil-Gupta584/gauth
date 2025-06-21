import express from "express";
import { config } from "dotenv";
import { google } from "googleapis";
import cors from "cors";
config();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const clientSecret = process.env.CLIENT_SECRET;
console.log({ clientId, redirectUri, clientSecret });

app.get("/getAuthUrl", (req, res) => {
  try {
    if (!clientId || !redirectUri) throw new Error("Invalid envs");
    const scopes = [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ];
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scopes.join(
      " "
    )}&access_type=offline&prompt=consent`;
    res.json({ authUrl });
  } catch (error) {
    console.error("Error in /getAuthUrl:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/verifyAuth", async (req, res) => {
  const code = req.body.code;
  if (!code) throw new Error("Code is required");
  try {
    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    );
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data: userinfo } = await oauth2.userinfo.get();

    res.json({ ok: true, userinfo });
  } catch (error) {
    console.error("Error in /getAuthUrl:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
