// import { useState, useEffect } from "react"
// import ProductCard from "../../components/ProductCard/ProductCard";
// import { products } from "../Home/products-data.js";

export function Home() {

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("/api/products/")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data));
  // }, []);


  return ( <main>
      <section className="navigation-feed"><a href="./index-eng.html">Home</a> {'>'} <a href="./index-eng.html">Gallery</a></section>

        <section className="section-products">
          <div className="product-list">
            {/* {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))} */}
          </div>
        </section>

        <section className="section-introduction">
          <h2>Nortex Welding Equipment</h2>
          <a>
            It is hard to imagine practically any production without welding. 
            Even if welding is not a production process itself, it is used for enterprise needs. 
            In turn, the development of electronics has caused a small revolution in welding – since previously the smallest device could not be lifted by four people, but now there are models that fit in your pocket. 
            Thanks to this, welding has become the most widespread technological process in the world, used everywhere. 
            A welding machine can be found in almost any workshop and even in a private home, not to mention some production facility.
            <br/>
            <br/>
            From the very beginning, Nortex focused exclusively on inverter technology and has achieved significant success in building inverter welding machines. 
            Before reaching the welder, the equipment undergoes a full testing cycle, which includes design and testing of various configuration options, execution, and packaging. 
            Even proper packaging requires a thorough design approach. 
            Therefore, offering machines both for beginner craftsmen, small workshops, and large industrial enterprises where equipment operates 24/7, we provide a proven solution.
          </a>
        </section>

        <section className="contact-section">
          <div className="contact-container">
          <div className="contact-title">
            <h3>Contact Us</h3>
            <p>Leave us your contact details, and we will get back to you shortly</p>
          </div>
          <form action="https://formsubmit.co/nouveauvosem@gmail.com" method="POST" className="contact-input-form">
            <input className="contact-input" name="name" type="text" placeholder="Name"/>
            <input className="contact-input" name="email" type="text" placeholder="Email"/>
            <input className="contact-input" name="subject" type="text" placeholder="Phone Number"/>
            <textarea name="message" className="contact-textarea"  placeholder="Comment"></textarea>
            <p className="small-text">*Information about privacy policy and no sharing of personal data with third parties</p>
            <button className="btn-orange">Send</button>
          </form>
          </div>
        </section>
        
    </main>)
}
