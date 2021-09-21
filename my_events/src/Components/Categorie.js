import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventLi from "./eventLi";
import Pagination from "./Pagination";

export default Categorie;

function Categorie() {
  const [records, setRecords] = useState([]);
  const [text, setText] = useState("");
  const [select, setSelect] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [length, setLength] = useState();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  useEffect(() => {
    fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=date_start+%3E%3D+" +
        yyyy +
        "%2F" +
        mm +
        "%2F" +
        dd +
        "AND+city%3A+Paris&rows=30&sort=-date_start&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&start=" +
        indexOfFirstPost,

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
        setLength(api.nhits);
        setRecords(
          api.records.map((records, i) => {
            return <EventLi key={i} records={records} />;
          })
        );
      });
  }, []);

  const onChangeHandler = (text) => {
    setText(text);
  };

  const onChangeSelect = (select) => {
    setSelect(select);
  };

  const onChangeDate = (date) => {
    if (date === "") {
      date = new Date();
    }
    setDate(date);
  };

  const search = async (city) => {
    console.log(date);
    let query = "&refine.tags=" + select;
    if (select === "") {
      query = "";
    }
    var today = new Date(date);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    await fetch(
      "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&facet=tags&q=city%3D+" +
        text +
        "&rows=30" +
        query +
        "&q=date_start+%3E%3D+" +
        yyyy +
        "%2F" +
        mm +
        "%2F" +
        dd +
        "&sort=-date_start",
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

        setRecords(
          api.records.map((records, i) => {
            return (
              <div id="parent">
                <div id="title" key={i}>
                  <Link to={"/events/" + records.fields.uid}>
                    {records.fields.title}
                  </Link>
                </div>
                <div id="city">
                  {records.fields.city} {records.fields.date_start}
                </div>
                <div id="description">{records.fields.description}</div>
                <div id="date"></div>
                <img id="img" src={records.fields.image}></img>
              </div>
            );
          })
        );
      });
  };

  const localisation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      await fetch(
        "https://public.opendatasoft.com/api/records/1.0/search/?dataset=evenements-publics-cibul&q=&rows=100&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&facet=updated_at&facet=city_district&geofilter.distance=" +
          position.coords.latitude +
          "%2C" +
          position.coords.longitude +
          "%2C1000",
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

          setRecords(
            api.records.map((records, i) => {
              return (
                <div id="parent">
                  <div id="title" key={i}>
                    {records.fields.title}
                  </div>
                  <div id="city">
                    {records.fields.city} {records.fields.date_start}
                  </div>
                  <div id="description">{records.fields.description}</div>
                  <div id="date"></div>
                  <img id="img" src={records.fields.image}></img>
                </div>
              );
            })
          );
        });
    });
  };

  /* index of firstPost = offSet API */

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        value={text}
      ></input>
      <button onClick={search}>Rechercher</button>
      <button onClick={localisation}>Autour de moi</button>
      <label htmlFor="categorie">Catégorie :</label>
      <select
        onChange={(e) => onChangeSelect(e.target.value)}
        value={select}
        id="categori"
      >
        <option value="" default>
          ---
        </option>
        <option value="concert">Concert</option>
        <option value="musique">Musique</option>
        <option value="gratuit">Gratuit</option>
        <option value="atelier">Atelier</option>
        <option value="exposition">Exposition</option>
      </select>
      <label for="start">Start date:</label>

      <input
        type="date"
        id="start"
        name="trip-start"
        onChange={(e) => onChangeDate(e.target.value)}
        value={date}
      ></input>

      {records}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={length}
        paginate={paginate}
      />
    </div>
  );
}
