import { NavLink  } from "react-router-dom";

export default Header = () => {
    

    return (
        <header>
            <NavLink to='/wallets'>Кошельки</NavLink>
            <NavLink to='/currency'>$/E</NavLink>
            <NavLink to="/about">Про нас</NavLink>
            <NavLink to='/auth'>Войти</NavLink>
        </header>
    )

}