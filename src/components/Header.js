import '../styles/Header.css'
import Netflix from '../images/netflix.svg'
import Usuario from '../images/usuario-netflix.png'

export const Header = ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
      <div className='header-logo'>
        <a href='/'>
          <img src={Netflix} alt='Netlix' />
        </a>
      </div>
      <div className='header-user'>
        <a href='/'>
          <img src={Usuario} alt='Netlix' />
        </a>
      </div>
    </header>
  )
}
