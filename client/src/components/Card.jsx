import {React} from 'react';
import s from './styles/Card.module.css';
import { Link } from "react-router-dom";



function Card({ image, name, weight, temperament, id}) {



    return (
        <Link to={`/details/${id}`} >
        <div className={s.content} >
            <div className={s.cardBody}>
                <div className={s.cardName}>
                    <h1>{name}</h1>
                </div>
                <div className={s.cardImage}>
                    <img className={s.dogImage} src={image} alt='Dog' />
                </div>
                <div className={s.cardWeight}>
                    <h3 className={s.weight}>{weight}kg</h3>
                </div>
                <div className={s.cardTemperaments}>
                    { temperament ? (<h3>{temperament}</h3>): (<p>No temperaments available </p>)}
                </div>
            </div>
            </div>
        </Link>
        );
}

export default Card;