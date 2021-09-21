import React, { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

          let form = new FormData();
          form.append("email", email);
          form.append("username", username);
          form.append("password", password);

          fetch("https://127.0.0.1:8000/register", {
            method: "POST",
            body: form,
          })
            .then((res) => { console.log(res)
              return res.text();
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
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
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
      </form>
    </div>
  );
}
