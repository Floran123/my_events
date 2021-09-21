import React, { useState, useEffect } from "react";

export default MeetupListItem;

function MeetupListItem(props) {
  const [organizer, setOrganizer] = useState("");

  useEffect(() => {
    fetch("https://127.0.0.1:8000" + props.meetup.organizer, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          document.cookie.substring(
            document.cookie.indexOf("/^") + 2,
            document.cookie.indexOf("$/")
          ),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrganizer(data.username);
      });
    return () => {
      setOrganizer("");
    };
  }, []);

  console.log(props.meetup);

  return (
    <div
      key={props.index}
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: "600px",
        justifyContent: "space-between",
        margin: "1em",
        textAlign: "center",
        border: "1px solid black",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1em",
        }}
      >
        <div>Title : {props.meetup.title}</div>
        <div>Organizer : {organizer}</div>
        <div>Description : {props.meetup.description}</div>
      </div>
      <button
        onClick={async () => {
          fetch("https://127.0.0.1:8000/api/events/" + props.meetup.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/merge-patch+json",
              Authorization:
                "Bearer " +
                document.cookie.substring(
                  document.cookie.indexOf("/^") + 2,
                  document.cookie.indexOf("$/")
                ),
            },
            body: JSON.stringify({}),
          })
            .then((res) => {
              console.log(res);
              return res.json();
            })
            .then((data) => {
              console.log(data);
            });
        }}
      >
        Participate
      </button>
    </div>
  );
}
