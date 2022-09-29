import React from 'react';
import s from './styles/Cardplaceholder.module.css';

function Cardplaceholder(props) {
    return (
        
        <div className={s.content} >
            <div className={s.cardBody}>
                <div className={s.cardName}>
                    
                </div>
                <div className={s.cardImage}>
                    <div className={s.dogImage}></div>
                </div>
                <div className={s.cardWeight}>
                    
                </div>
                <div className={s.cardTemperaments}>
                    
                </div>
            </div>
            </div>

    );
}

export default Cardplaceholder;