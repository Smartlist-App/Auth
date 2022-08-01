import executeQuery, { executeApiQuery } from "../../lib/db";
import argon2 from "argon2";
import notp from "notp";
import { v4 as uuidv4 } from "uuid";

const handler = async (req: any, res: any) => {
  try {
    // Validate app ID
    const app: any = await executeApiQuery({
      query: "SELECT * FROM Apps WHERE MD5(id) = ? LIMIT 1",
      values: [req.body.appId ?? "false"],
    });
    console.log(app);
    if (app.length !== 1) {
      res.json({
        success: false,
        "2fa": false,
      });
      return;
    }

    // Fetch emails from DB
    const result: any = await executeQuery({
      query: "SELECT * FROM Accounts WHERE email = ? LIMIT 1",
      values: [req.body.email ?? "false"],
    });

    // If email is invalid
    if (result.length !== 1) {
      res.json({
        success: false,
        "2fa": false,
      });
      return;
    }

    // Check Argon2 hash with provided password
    const validPassword = await argon2.verify(
      result[0].password,
      req.body.password
    );

    // If password is invalid
    if (validPassword === false) {
      res.json({
        success: false,
        "2fa": false,
      });
      return;
    }

    // Return data if 2FA is not enabled
    if (result[0]["2faCode"] === "false") {
      const accessToken = uuidv4();
      await executeQuery({
        query: "INSERT INTO UserTokens(user, token) VALUES(?, ?)",
        values: [result[0].id, accessToken],
      });
      // Return data
      res.json({
        success: true,
        "2fa": false,
        token: accessToken,
        redirectUri: app[0]["redirect_uri"],
      });
      return;
    }

    const key = result[0]["2faCode"];
    const token = req.body.twoFactorCode;

    // Check TOTP is correct (HOTP if hotp pass type)
    const login = notp.totp.verify(token, key);

    // invalid token if login is null
    if (!login) {
      res.json({
        success: false,
        "2fa": true,
      });
      return;
    }
    const accessToken = uuidv4();
    await executeQuery({
      query: "INSERT INTO UserTokens(user, token) VALUES(?, ?)",
      values: [result[0].id, accessToken],
    });
    // Return data
    res.json({
      success: true,
      "2fa": false,
      token: accessToken,
      redirectUri: app[0]["redirect_uri"],
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export default handler;
