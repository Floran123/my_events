import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [organizedMeetups, setOrganizedMeetups] = useState([]);
  const [followedMeetups, setFollowedMeetups] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/get/me", {
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
      .then((data) => {
        console.log(data);
        setOrganizedMeetups(
          data.events.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "1em",
                  border: "1px solid black",
                  padding: "1em",
                }}
              >
                <Link to={"/meetups/" + e.id} style={{ fontSize: "24px" }}>
                  {e.title}
                </Link>
                <p>{e.description}</p>
                <button
                  onClick={async (event) => {
                    fetch("https://127.0.0.1:8000/api/events/" + e.id, {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Bearer " +
                          document.cookie.substring(
                            document.cookie.indexOf("/^") + 2,
                            document.cookie.indexOf("$/")
                          ),
                      },
                    }).then((res) => {
                      console.log(res);
                      event.target.parentElement.remove();
                    });
                  }}
                >
                  Cancel Meetup
                </button>
              </div>
            );
          })
        );
        setFollowedMeetups(
          data.eventsParticipant.map((e, i) => {
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "1em",
                  border: "1px solid black",
                  padding: "1em",
                }}
              >
                <Link to={"/meetups/" + e.id} style={{ fontSize: "24px" }}>
                  {e.title}
                </Link>
                <p>{e.description}</p>
                <button
                  onClick={async (event) => {
                    await fetch("https://127.0.0.1:8000/api/events/" + e.id, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/ld+json",
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
                        event.target.parentElement.remove();
                        return res.json();
                      })
                      .then((data) => {
                        console.log(data);
                      });
                  }}
                >
                  Unfollow
                </button>
              </div>
            );
          })
        );
      });

    return () => {
      setOrganizedMeetups([]);
      setFollowedMeetups([]);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div className="organized_events">
        <h3 style={{ textAlign: "center" }}>Organized</h3>
        {organizedMeetups ? organizedMeetups : "No meetups organized"}
      </div>
      <div className="followed_events">
        <h3 style={{ textAlign: "center" }}>Followed</h3>
        {followedMeetups ? followedMeetups : "No meetups followed"}
      </div>
    </div>
  );
}
