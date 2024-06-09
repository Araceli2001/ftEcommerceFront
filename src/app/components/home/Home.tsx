

import React from "react";
import Cards from "../cards/Cards";
import { getAllProducts } from "@/app/requests/getProduct";

const Home1 = async () => {
    const products = await getAllProducts();
   return (
       <div>
           <div>
               <Cards products={products} />
           </div>
       </div>
   );
}

export default Home1;
