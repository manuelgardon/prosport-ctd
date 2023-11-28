/* eslint-disable react/prop-types */
import { IconParkingSquare, IconTruckMedical, IconPeople, IconBar, IconFlag, IconWC } from "./icons";

// este componente se renderiza en EspacioPage
export default function ServiciosRender({ caracteristicas }){
  // definimos los iconos y nombres de cada caracteristica en un array
  const caracteristicasData = [
    { name: 'Estacionamiento', icon: <IconParkingSquare/> },
    { name: 'Atencion medica', icon: <IconTruckMedical/>},
    { name: 'Servicio de alimentos y bebidas', icon: <IconBar/>    },
    { name: 'Apto para reuniones y eventos', icon: <IconPeople/>    },
    { name: 'Servicio de arbitraje', icon: <IconFlag/>  },
    { name: 'Vestuarios y duchas', icon: <IconWC/>   },
  ];

  return (
    <div className="caracteristicas-container">
      <h3 className=" text-white pt-3">Características:</h3>
      <ul>
        {caracteristicas.map((caracteristica, index) => {
          const caracteristicaData = caracteristicasData.find((data) => data.name === caracteristica);
          if (caracteristicaData) {
            return (
              <li className="flex flex-wrap -mx-4 items-center m-3 pl-4 text-white" key={index}>
                <li className="pr-2">
                {caracteristicaData.icon}
                </li>
                <li>
                {caracteristicaData.name}
                </li>
              </li>
              
            );
          }
        })}
      </ul>
    </div>
  );
}


