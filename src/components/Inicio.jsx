import React from 'react';
import Navbar from './Navbar';
import { Maps, MenuDerecha } from './Home'; // Importa Maps y MenuDerecha desde Home.js
import Mapa from './Mapa'; // Importa el componente Mapa
import { getUserRole } from '../components/auth'; // Importa función para obtener el rol del usuario
import '../stylesheets/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio({ userData, handleLogout }) {
    const userRole = getUserRole();

    return (
        <> 
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <Mapa />
                        <Maps /> {/* Utiliza el componente Maps aquí */}
                    </div>
                    <div className="col-4">
                    <div>
                            <h3>Bienvenido, {userData ? userData.username : 'Usuario'}</h3>
                            <p>Rol: {userRole}</p>
                            <button onClick={handleLogout}>Cerrar sesión</button>
                            {/* Otro contenido de la página de inicio */}
                        </div>
                        <MenuDerecha /> {/* Utiliza el componente MenuDerecha aquí */}
                       
                    </div>
                </div>
            </div>
        </>
    );
}

export default Inicio;
