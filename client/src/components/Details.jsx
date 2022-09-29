import React from "react";
import { Link } from "react-router-dom";
import s from "./styles/Details.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Detailsholder from "./Detailsholder";
import left from "../img/left.png";

import { getDetails, cleaner, getTemperaments/* , addToFavorite */ } from "../redux/actions/actions";

function Details(props) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const dog = useSelector((state) => state.dogDetails);
  const { height, weight, life_span, name, image, temperament, temperaments } =
    dog;

  useEffect(() => {
    dispatch(cleaner());
    dispatch(getTemperaments());
    dispatch(getDetails(id));
    props.funcNav(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

/*   const addToFavs = (id) => {
    try{
      dispatch(addToFavorite(id))
    }catch(err){
      console.log(err);
    }
  } */

  /* console.log(dog); */
  return (
    <>

      <div className={s.holdPlace}>
        <Link to="/home">
          <div className={s.goBackBody}>
            <img className={s.left} src={left} alt="left" />
          </div>
        </Link>

        <div className={s.body}>
          {name ? (
            <>
              <div className={s.cardBody}>
                <div className={s.card}>
                  <div className={s.name}>
                    <h1>{dog?.name}</h1>
                  </div>
                  <div>
                    <img className={s.dogImage} src={image} alt="doggo" />
                  </div>

                  <div className={s.order}>
                    <div className={s.bodyTemperaments}>
                      <h3 className={s.h3}>Temperaments</h3>

                      {/*   {temperament.map(e => {<p>  {e.name} </p>} )} */}

                      {/* <p  >{temperament}</p> */}

                      {temperament ? (
                        <p className={s.temperaments}>{temperament}</p>
                      ) : (
                        <p>{temperaments}</p>
                      )}
                    </div>
                    <div className={s.bodyWeight}>
                      <h3 className={s.h3}>Weight</h3>
                      <p className={s.weight}>{weight}kg</p>
                    </div>
                    <div className={s.bodyHeight}>
                      <h3 className={s.h3}>Height</h3>
                      <p className={s.height}>{height}cm</p>
                    </div>
                    <div className={s.bodyLifeSpan}>
                      <h3 className={s.h3}>Life span</h3>
                      <p className={s.lifeSpan}>{life_span}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Detailsholder />
            </div>
          )}
        </div>
      </div>
      {/* <button className={s.favBtn} onClick={addToFavs(id)}>♥</button> */}
    </>
  );
}

export default Details;
