import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import EventListItem from "../EventListItem";

export default function EventPage() {
  let { id } = useParams();

  const [e, setE] = useState([]);

  useEffect(() => {
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=uid%3D " +
        id +
        "+&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district "
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.records);
        let records = data.records[0];
        setE(
          <div>
            <div id="title">{records.fields.title}</div>
            <div id="city">
              {records.fields.city} {records.fields.date_start}
            </div>
            <div id="description">
              <h3>Description :</h3> <p>{records.fields.free_text}</p>
            </div>
            <div id="date"></div>
            <img id="img" src={records.fields.image} />
            <EventListItem key={0} object={records} />
          </div>
        );
      });
    return () => {};
  }, []);

  return <div style={{ maxWidth: "720px", margin: "auto" }}>{e}</div>;
}
