import React from 'react';
import s from './styles/Placeholder.module.css';
import Cardplaceholder from './Cardplaceholder';

function Placeholder(props) {
    const rangeId = () => {
        let range = [];
        for(let i = 100; i < 115; i++){
            let value = i;
            range.push({value});
        }
        return range;
    }
    const result = rangeId();

    return (
        <>
        <div>
            <div className={s.paginado}>
                    <div className={s.pages}>  {/* // if pagesize / math.ceildogs.length less than 1 dont render */}
                        <button className={s.prevNext} >
                         
                        </button>
                    </div>
            
            <div>
              <button className={s.prevNext}>
              
              </button>
            </div>

          </div>
        

          </div>
        <div className={s.content}>
            <div className={s.cardsPos}>
                {
                    result &&
                    result?.map((e, i) => {
                        return(
                            <div key={i} >
                                <Cardplaceholder/>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
</>
    );
}

export default Placeholder;