import React from 'react';
import { Link } from 'react-router-dom';
import s from './styles/Navbar.module.css';

function Navbar(props) {
    return (
        <>
            
            <div className={s.navBody}>
            
                <Link to='/home'>
                <div className={s.logo}>
                    <h1>Doggies</h1>
    
                </div>
                </Link>
                
                <div className={s.linksBody}>
                <div className={s.navLinks}>
                    <Link to='/home'>
                        <h4>Home</h4>
                    </Link>
                </div>

                <div className={s.navLinks}>
                    <Link to='/newdog'>
                    
                        <h4>Add dog</h4>
                    </Link>
                </div>
    
                </div>
                <div className={s.backgroundWrapper}> <h1>ㅤ</h1></div> {/* invisible character, can be bad */}
            </div>
            
        </>
        );
    }
export default Navbar;