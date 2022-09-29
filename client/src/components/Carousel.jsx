import React from 'react';
import s from './styles/Carousel.module.css';
import CarouselCard from '../components/CarouselCard';


function Carousel({dogs}) {
 
    return (
        <div className={s.content}>
            <div className={s.cardsPos}>
                {
                    dogs &&
                    dogs.map((e) => {
                        return(
                            <div key={e.id}>
                                <CarouselCard key={e.id} name={e.name} image={e.image} />
                            </div>
                        )
                    } )
                }
            </div>
        </div>
        );
}

export default Carousel;