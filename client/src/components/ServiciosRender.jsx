/* eslint-disable react/prop-types */
import { IconParkingSquare, IconTruckMedical } from "./icons";

// este componente se renderiza en EspacioPage
export default function ServiciosRender({ caracteristicas }){
  // definimos los iconos y nombres de cada caracteristica en un array
  const caracteristicasData = [
    { name: 'Estacionamiento', icon: <IconParkingSquare/> },
    { name: 'Atencion medica', icon: <IconTruckMedical/>},
    { name: 'Servicio de alimentos y bebidas', icon: <IconTruckMedical/>    },
    { name: 'Apto para reuniones y eventos', icon: <IconTruckMedical/>    },
    { name: 'Servicio de arbitraje', icon: <IconTruckMedical/>  },
    { name: 'Vestuarios y duchas', icon: <IconTruckMedical/>   },
  ];

  return (
    <div className="caracteristicas-container">
      <h3>Características:</h3>
      <ul>
        {caracteristicas.map((caracteristica, index) => {
          const caracteristicaData = caracteristicasData.find((data) => data.name === caracteristica);
          if (caracteristicaData) {
            return (
              <li key={index}>
                {caracteristicaData.icon} {caracteristicaData.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}


