import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import defaultImg from "../../assets/defaultIcon.jpeg";

export default function MeetUpPage(props) {
  let { id } = useParams();
  const [desc, setDesc] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [organizer, setOrganizer] = useState([]);

  useEffect(() => {
    fetch("https://127.0.0.1:8000/api/events/" + id, {
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
        setDesc(
          <div>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
            <p>
              Meetup organized around :{" "}
              <Link to={"/events/" + data.uid}>UID</Link>
            </p>
            <hr />
          </div>
        );
        setParticipants(
          data.participant.map((url, i) => {
            return (
              <div key={i}>
                <FetchUser link={url} />
              </div>
            );
          })
        );
        setOrganizer(<FetchUser link={data.organizer} />);
      });

    return () => {};
  }, []);

  return (
    <div>
      <div className="description">{desc}</div>
      <div className="party">
        <div>Organizer: {organizer}</div>
        <div>Participants: {participants}</div>
      </div>
    </div>
  );
}

function FetchUser(props) {
  const [user, setUser] = useState();
  const [userImage, setUserImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://127.0.0.1:8000" + props.link, {
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
        setUser(data?.username);
        setUserImage(data?.avater);
        setLoading(false);
      });
    return () => {
      setUser("");
      setLoading(true);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {" "}
      <img
        src={userImage ? "https://127.0.0.1:8000/" + userImage : defaultImg}
        alt="profile"
        style={{ width: "64px", height: "64px" }}
      />
      <p>{user}</p>
    </div>
  );
}
