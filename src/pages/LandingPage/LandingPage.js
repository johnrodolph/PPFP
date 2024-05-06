import logo from './res/logo.png';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
 
  const handleContactUsClick = () => {
    navigate('/contactus');
  };
  const handleAboutUsClick = () => {
    navigate('/aboutus');
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
          <button className="contactus-button" onClick={handleContactUsClick}>
              ContactUs
            </button>
          <button className="aboutus-button" onClick={handleAboutUsClick}>
              AboutUs
            </button>
            <button className="sign-in-landingpage-button" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="sign-up-landingpage-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </header>
        <div className="App-body">
          
          <div className='welcome'>WELCOME<br />TO <br /> PEER PROJECT<br />FEEDBACK PLATFORM!</div>
          <section class="join-section">
            <div className='unlock'>Unlock the Power of Collaborative Learning</div>
            <p>Are you a student eager to enhance your programming <br /> skills and receive constructive feedback on your projects? 
             <br/> <br />Look no further! </p>
             <p><b>PeerProjectFeedbackPlatform</b> is your go-to platform<br />
              for sharing, and improving your coding projects.</p>
            <button className="join-now-button" onClick={handleSignInClick}>JOIN NOW</button>
          </section>
        </div>
    </div>
  );
}

export default LandingPage;
