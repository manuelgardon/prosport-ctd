/* eslint-disable react/prop-types */

import { IconParkingSquare, IconTruckMedical } from "./icons";

const serviciosData = [
  { name: 'Estacionamiento', icon: <IconParkingSquare/> },
  { name: 'Atencion medica', icon: <IconTruckMedical/>},
  { name: 'Servicio de alimentos y bebidas', icon: <IconTruckMedical/>    },
  { name: 'Apto para reuniones y eventos', icon: <IconTruckMedical/>    },
  { name: 'Servicio de arbitraje', icon: <IconTruckMedical/>  },
  { name: 'Vestuarios y duchas', icon: <IconTruckMedical/>   },
];

export default function Servicios ({ selected, onChange }) {
  const handleServiceToggle = (serviceName) => {
    if (selected.includes(serviceName)) {
      onChange(selected.filter((name) => name !== serviceName));
    } else {
      onChange([...selected, serviceName]);
    }
  };


  return (
    <section>
      <h2 className="text-2xl mt-4">Servicios</h2>
      <p>
        <small className="text-gray-500">Selecciona los servicios que ofrece tu espacio</small>
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
        {serviciosData.map((servicio) => (
          <button
            key={servicio.name}
            type="button"
            className={`border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ${
              selected.includes(servicio.name) ? ' bg-green-500 text-white' : ''
            }`}
            onClick={() => handleServiceToggle(servicio.name)}
          >
            {servicio.icon}
            <span>{servicio.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}