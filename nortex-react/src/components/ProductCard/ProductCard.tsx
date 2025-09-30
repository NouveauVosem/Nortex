// import { NavLink } from "react-router";

// function ProductCard({ product: any }) {

//     const parametersHTML = product.parameters
//     .slice(0, 3)
   


//   return (
//     <div className="product">
//               <div className="product-img">
//               <NavLink to={`/product/${product.id}`}>
//                 <img src={product.img[0]}/>
//               </NavLink>
//               </div>
//               <div className="product-title">
//                 <a href="./${productPage}?id=${product.id}"><h3><b>${product.name}</b></h3></a>
//               </div>
//               <div className="product-icon">
//                 <div>
//                 <img src="assets/img/icon-delivery-truck.svg" />
//                 <a>Delivery</a>
//                 </div>
//                 <div>
//                 <img src="assets/img/icon-delivery-self.svg" />
//                 <a>Pickup</a>
//                 </div>
//               </div>
              
//               <div className="product-info">
//                 {parametersHTML.map(param => {
//                   return (<><a>{param.label}: <b>{param.value}</b></a><br/></>)
//                   })}
//               </div>

//               <div className="product-btn-wrap">
//                 <a href="./${productPage}?id=${product.id}">
//                   <button className="btn-product">
//                     Learn more
//                   </button>
//                 </a>
//               </div>
              
//             </div>
//   )
// }

// export default ProductCard