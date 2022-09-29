import React from 'react';
import s from './styles/Cards.module.css';
import Card from '../components/Card';
function Cards({range}) {
 
    return (
        <div className={s.content}>
            <div className={s.cardsPos}>
                {
                    range &&
                    range.map((e) => {
                        return(
                            <div key={e.id}>
                                <Card key={e.id} id={e.id} name={e.name} weight={e.weight} temperament={e.temperament} image={e.image} />
                            </div>
                        )
                    } )
                }
            </div>
        </div>
        );
}

export default Cards;