import vectorLogo from "../../src/images/VectorLogo.svg";
import { Route, Switch, Link } from 'react-router-dom';




function Header(props) {

  return (
    <header className="header">
      <img src={vectorLogo} alt="место" className="header__img" />
      <Switch>
        <Route path="/sign-up">
          <Link to='/sign-in' className='button header__Link header__text'>Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to='/sign-up' className='button header__Link header__text'>Регистрация</Link>
        </Route>
        <Route path="/">
          <div className='header__auth-section'>
            <p className='header__text'>{localStorage.getItem('email')}</p>
            <Link className='button header__text header__button' onClick={props.onSignOut} to='/sign-in'>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
