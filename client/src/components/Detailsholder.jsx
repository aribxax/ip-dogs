import React from 'react';
import s from './styles/Detailsholder.module.css';

function Detailsholder(props) {
    return (
        <>

            <div className={s.holdPlace}>
   
            
                <div className={s.body}>
    
   
                    <div className={s.cardBody}>
                            
                        <div className={s.card}>
                                <div className={s.name}>
                                    {/* <h1></h1> */}
                                </div>
                                <div className={s.dogImage}>
                                    
                                </div>
        
                            <div className={s.order}>
        
                                <div className={s.bodyTemperaments}>
                                    {/* <h3 className={s.h3}></h3> */}
                                   
                                    
                                </div>
                                <div className={s.bodyWeight}>
                                    {/* <h3 className={s.h3}></h3> */}
                                    <p className={s.weight}></p>
                                </div>
                                <div className={s.bodyHeight}>
                                    {/* <h3 className={s.h3}></h3> */}
                                    <p className={s.height}></p>
                                </div>
                                <div className={s.bodyLifeSpan}>
                                    {/* <h3 className={s.h3}></h3> */}
                                    <p className={s.lifeSpan}></p>
                                </div>  
                            </div>
                        </div>
                    </div>
                   
            
                </div>
                </div>
            </>
    );
}

export default Detailsholder;