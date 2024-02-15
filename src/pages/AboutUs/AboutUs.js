import logo from './res/logo.png';
import pc1 from './res/1pc.gif'
import pc2 from './res/2pc.gif'
import pc3 from './res/3pc.gif'
import pc4 from './res/4pc.gif'
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';
function AboutUs() {

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
          <button className="back-aboutuspage-button" onClick={handleBackClick}>
              BACK
            </button>
            <button className="sign-in-aboutuspage-button" onClick={handleSignInClick}>
              Sign In
            </button>
            <button className="sign-up-aboutuspage-button" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </header>
        <div className="App-body">
          
        
          <section class="join-section-aboutus">
            <div class="aboutus">ABOUT US</div>
             <p>At <b>PeerProjectFeedbackPlatform</b>, we believe in the transformative <br />
             power of collaborative learning.<br />Our platform was born from the idea that every student can<br />
             accelerate their<br />programming skills when given the right environment a<br />
                and community support. Whether you're a coding novice or a<br /> 
                seasoned developer,<br />
                <b>PeerProjectFeedbackPlatform</b> is<br />
                your partner in the journey of continuous improvement.</p>
            
          </section>

          
          <section class="team">
		<div class="ourteam">
			Our Team
		</div>

		<div class="team-content">
			<div class="box">
				<img src={pc1}/>
				<h3>John Francdel Costan</h3>
				<h4>Position</h4>
        <h4>Motto</h4>
			</div>

			<div class="box">
      <img src={pc4}/>
				<h3>John Rodolph Bacalso</h3>
				<h4>Position</h4>
        <h4>Motto</h4>
			</div>

			<div class="box">
      <img src={pc3}/>
				<h3>John Bryan Ramon</h3>
				<h4>Position</h4>	
        <h4>Motto</h4>
			</div>

			<div class="box">
      <img src={pc2}/>
				<h3>Aaron Sambrana </h3>
				<h4>Position</h4> 
        <h4>Motto</h4>
			</div>

		</div>
	</section>

        </div>
    </div>
  );
}

export default AboutUs;
