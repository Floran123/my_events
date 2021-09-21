import React, { useState, useEffect } from "react";
import "../styles/home.css";
import EventListItem from "./EventListItem";

export default Home;

function Home() {
  const [categories, setCategorie] = useState([]);

  useEffect(() => {
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=evenement&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&refine.tags=concert",
      {
        method: "GET",
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((api) => {
        console.log(api);
        setCategorie(
          api.records.map((object, i) => {
            return <EventListItem key={i} object={object} />;
          })
        );
      });
  }, []);

  return <div>{categories}</div>;
}
