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
    <div className="caracteristicas-container my-5">
      <h3 className="text-center text-4xl text-[#00FF9D]">Características:</h3>
      <ul className="border border-white">
        {caracteristicas.map((caracteristica, index) => {
          const caracteristicaData = caracteristicasData.find((data) => data.name === caracteristica);
          if (caracteristicaData) {
            return (
              <li key={index} className="text-white">
                {caracteristicaData.icon} {caracteristicaData.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}


