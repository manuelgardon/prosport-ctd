/* eslint-disable react/prop-types */
import { IconParkingSquare, IconTruckMedical } from "./icons";

export default function ServiciosRender({ caracteristicas }){
  // Definir iconos y nombres de características
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


