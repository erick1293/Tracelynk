import React from 'react';
import Navbar from './Navbar'; 
import {Maps , MenuDerecha} from "./Home"
import '../stylesheets/Home.css';

function Home() {
  return (
<> 
      <Navbar />
      <div className="container">
      <div className="row">
        <div className="col-md-6">
          <Maps />
        </div>
        
        <div className="col-md-6">
          <MenuDerecha />
        </div>
      </div>
    </div>
</>
  );
}

export default Home;