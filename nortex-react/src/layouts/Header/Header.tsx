function Header() {
  return (
    <header>
      <div className="header-top">
        <div id="contacts-phone-header" className="header-phone"></div>
        
         <div className="language-container">
          <button className="btn-light lang-btn" data-lang="ukr">укр</button>
          <button className="btn-light lang-btn" data-lang="eng">eng</button>
        </div>
      </div>
     
      <div className="header-content">
        
        <div className="header-left">
          <div className="logo">
            <a href="${link('index')}"><img src="assets/img/nortex-logo-orange.svg"/></a>
          </div>
        </div>
        <div className="header-right">
        <div className="header-burger">
          <img src="assets/icons/icon-burger.svg"/>       
        </div>
          <div className="menu-container">
          <nav className="navbar-container menu">
              <li className="navbar-item"><a href="${link('index')}">Gallery</a></li>
              <li className="navbar-item"><a href="${link('about')}">About Us</a></li>
              <li className="navbar-item"><a href="${link('contacts')}">Contacts</a></li>
          </nav>
          <button id="openModal" className="btn-orange menu">Order</button>
          </div>
        </div>
      </div>
      <div className="modal-overlay" id="modalOverlay">
        <div className="modal">
          <span className="close-btn" id="closeModal">&times;</span>
          <h3>Ask about product</h3>
          <form action="https://formsubmit.co/nouveauvosem@gmail.com" method="POST" className="contact-input-form">
            <input className="contact-input" name="name" type="text" placeholder="Name" />
            <input className="contact-input" name="email" type="text" placeholder="Email" />
            <input className="contact-input" name="subject" type="text" placeholder="Phone number" />
            <textarea name="message" className="contact-textarea"  placeholder="I want to order this product. Please contact me to clarify details."></textarea>
            <button className="btn-orange">Send</button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header