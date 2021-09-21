import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function eventLi(props) {
  return (
    <div id="parent">
      <div id="title" key={props.key}>
        <Link to={"/events/" + props.records.fields.uid}>
          {props.records.fields.title}
        </Link>
      </div>
      <div id="city">
        {props.records.fields.city} {props.records.fields.date_start}
      </div>
      <div id="description">{props.records.fields.description}</div>
      <div id="date"></div>
      <img id="img" src={props.records.fields.image}></img>
    </div>
  );
}
