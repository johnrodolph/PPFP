import logo from './res/logo.png';
import './ContactUs.css';
import { useNavigate } from 'react-router-dom';
function ContactUs() {

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/landingpage');
  };
  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="App">
        <header className="App-header">
          <img
            src={logo}
            alt="logo"
            style={{ height: '216px', width: '216px', marginRight: '16px', alignSelf: 'flex-start' }}
          />
          <div className="button-container">
          <button className="back-contactuspage-button" onClick={handleBackClick}>
              BACK
            </button>
            <button className="sign-in-contactuspage-button" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="sign-up-contactuspage-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </header>
        <div className="App-body">
          
        
          <section class="join-section-contactus">
            <div class="contactus">Contact US</div>
          <div className='contact'></div>
          <div className="form-container-contact">
            
          </div>
          </section>

          
          

        </div>
    </div>
  );
}

export default ContactUs;
