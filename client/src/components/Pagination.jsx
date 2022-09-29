import React from 'react';

import s from './styles/Pagination.module.css';
import right from '../img/right.png';
import left from '../img/left.png';
import { v4 as uuid } from 'uuid';


function Pagination({setCurrentPage, currentPage, dogs, pageSize}) {

    const unique_id = uuid();
    const small_id = unique_id.slice(0,8)
  
    let pageNumber = [];
    for(let i = 1; i <= Math.ceil(dogs.length / pageSize); i++){
 /*        if(i < ((Math.ceil(dogs.length / pageSize)) - 3) && !(i < currentPage + 5 ) ){
            pageNumber.push('...')
            for(let i = 1; i <= pageNumber; i++){
                if(pageNumber[i] < (currentPage)){
                    let index = pageNumber.indexOf(pageNumber[i]);
                    pageNumber.splice(index, 1)
                }
            }
            pageNumber.shift()
            continue;
        } */
        if (i <= 4 || i === Math.ceil(dogs.length / pageSize) || Math.abs(currentPage - i) <= 1){
        pageNumber.push(i);
     }
    }
    const nextPage = () => {
        if(currentPage >= Math.ceil(dogs.length / pageSize)) return;
        setCurrentPage(currentPage + 1 );
    };
    const changePage = (num) => {
        setCurrentPage(num);
    }
    const prevPage = () => {
        if(currentPage <= 1) return;
        setCurrentPage(currentPage - 1)
    };


    return (
     
            <div>
            {<div className={s.paginado}>
                    <div className={s.pages}>  {/* // if pagesize / math.ceildogs.length less than 1 dont render */}
                        <button className={s.prevNext} onClick={prevPage}>
                            <img className={s.previous} src={left} alt='Previous button'/>
                        </button>
                    </div>
            
                <div>
                    {pageNumber &&
                        pageNumber.map((num, i) => {
                        if (num !== currentPage) {
                            return (
                                <div key={i} className={s.pagesWrapper}>
                                    <button
                                        className={s.pageNum}
                                        /* key={num} */
                                        onClick={() => changePage(num)}
                                    >
                                    {num}
                                    </button>
                                </div>
                                );
                        }
                  return (
                    <div key={small_id} className={s.pagesWrapper}>
                        <button
                            className={s.pageNum}
                            
                            onClick={() => changePage(num)}>
                            {num}
                        </button>
                    </div>
                    );
                })}
            </div>
            
            <div className={s.pages}>
              <button className={s.prevNext} onClick={nextPage}>
              <img className={s.next} src={right} alt='Next button'/>
              </button>
            </div>

          </div>
        }

          </div>
    );
}

export default Pagination;