import React, { useState } from "react";

export default function EventListItem(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div
      id="categorie"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        padding: "1em",
      }}
      key={props.key}
    >
      <h3>Create Meetup for Event</h3>
      <label htmlFor="title">Meetup Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="title">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></textarea>
      <div>
        <label htmlFor="public">Public?</label>
        <input type="checkbox" name="public" id="public" />
      </div>
      <button
        onClick={async (e) => {
          console.log(
            "Bearer " +
              document.cookie.substring(
                document.cookie.indexOf("/^") + 2,
                document.cookie.indexOf("$/")
              )
          );
          fetch("https://127.0.0.1:8000/api/events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                document.cookie.substring(
                  document.cookie.indexOf("/^") + 2,
                  document.cookie.indexOf("$/")
                ),
            },
            body: JSON.stringify({
              uid: props.object.fields.uid,
              public: document.getElementById("public").checked,
              title: title,
              description: description,
            }),
          })
            .then((res) => {
              console.log(res);
              return res.json();
            })
            .then((data) => console.log(data));
        }}
      >
        Organize Meeting
      </button>
    </div>
  );
}
