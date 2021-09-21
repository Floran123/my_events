import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "229591679296-akbmn0h218iqdi8gphfm0uc2v6bb7akr.apps.googleusercontent.com";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSucess = (res) => {
    console.log("[Login Success] currentUser:", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={async (e) => {
          e.preventDefault();
          fetch("https://127.0.0.1:8000/api/login_check", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              document.cookie = "token=/^" + data.token + "$/; secure;";
            });
        }}
      >
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input type="submit" value="Submit" />
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSucess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "100px" }}
          isSignedIn={true}
        />
      </form>
    </div>
  );
}
