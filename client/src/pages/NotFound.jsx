import React from "react";
import { useEffect } from "react";
import perro from "../img/perro.jpg";
import perro1 from "../img/perro1.jpg";
import perro2 from "../img/perro2.jpg";
import perro3 from "../img/perro3.jpg";
import perro4 from "../img/perro4.jpg";

import s from "./styles/NotFound.module.css";

function NotFound(props) {
  const funcNav = props.funcNav;
  useEffect(() => {
    funcNav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const random = (max, min) => {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  };

  const perros = [
    `${perro}`,
    `${perro1}`,
    `${perro2}`,
    `${perro3}`,
    `${perro4}`,
  ];

  return (
    <>
      <div className={s.placeHolder}></div>
      <div className={s.body}>
        <img className={s.img} src={perros[random(4, 0)]} alt="dog" />
        <h1 className={s.header}>404</h1>
        <h2 className={s.header2}>Not found</h2>
        <p className={s.p}>
          The page you are looking for cannot be displayed because an invalid
          method (HTTP verb) is being used.
        </p>
      </div>
    </>
  );
}

export default NotFound;
