import React, { useState, useEffect } from "react";

import MeetupListItem from "./MeetUpListItem";

export default Meetups;

function Meetups() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/events/", {
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
      .then((res) => {
        return res.json();
      })
      .then((api) => {
        console.log(api);
        setMeetups(
          api["hydra:member"].map((meetup, index) => {
            return <MeetupListItem meetup={meetup} index={index} />;
          })
        );
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {meetups}
    </div>
  );
}
