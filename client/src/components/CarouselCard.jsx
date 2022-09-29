import {React} from 'react';
import s from './styles/CarouselCard.module.css';



function CarouselCard({ image, name}) {

    return (
        <div className={s.content} >
            <div className={s.cardBody}>
                <div className={s.cardName}>
                    <h1 >{name}</h1>
                </div>
                <div className={s.cardImage}>
                    <img className={s.dogImage} src={image} alt='Dog' />
                </div>
            </div>
            </div>
        );
}

export default CarouselCard;