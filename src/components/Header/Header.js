import React from 'react';
import style from './Header.module.scss';
import logo from '../../img/Logo.svg';



const Header = () =>(
    <header className={style.header}>
        <div className={style.header__top}>
            <div className={style.wrap_log}>
                <a href='#'><img src={logo} alt="img_logo"/></a>
            </div>
            <nav className={style.menu}>
                <ul className={style.menu__list}>
                    <li className={style.menu__item}><a href='#get_request'><button className={'button ' + style.button_header}>Users</button></a></li>
                    <li className={style.menu__item}><a href='#post_request'><button className={'button ' + style.button_header}>Sign up</button></a></li>
                </ul>
            </nav>
        </div>
    </header>
);

export default Header;
