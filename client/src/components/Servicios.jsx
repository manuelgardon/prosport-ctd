/* eslint-disable react/prop-types */

import { IconParkingSquare, IconTruckMedical } from "./icons";

const serviciosData = [
  { nombre: 'Estacionamiento', icon: <IconParkingSquare/> },
  { nombre: 'Atencion medica', icon: <IconTruckMedical/>},
  { nombre: 'Servicio de alimentos y bebidas', icon: <IconTruckMedical/>    },
  { nombre: 'Apto para reuniones y eventos', icon: <IconTruckMedical/>    },
  { nombre: 'Servicio de arbitraje', icon: <IconTruckMedical/>  },
  { nombre: 'Vestuarios y duchas', icon: <IconTruckMedical/>   },
];

// este componente se renderiza en FormEspacio
export default function Servicios ({ selected, onChange }) {

  function handleServicioToggle(servicenombre) {
    if (selected.includes(servicenombre)) {
      onChange(selected.filter((nombre) => nombre !== servicenombre));
    } else {
      onChange([...selected, servicenombre]);
    }
  }

  return (
    <section>
      <h2 className="text-2xl mt-4">Servicios</h2>
      <p>
        <small className="text-gray-500">Selecciona los servicios que ofrece tu espacio</small>
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
        {serviciosData.map((servicio) => (
          <button
            key={servicio.nombre}
            type="button"
            className={`border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ${
              selected.includes(servicio.nombre) ? ' bg-green-500 text-white' : ''
            }`}
            onClick={() => handleServicioToggle(servicio.nombre)}
          >
            {servicio.icon}
            <span>{servicio.nombre}</span>
          </button>
        ))}
      </div>
    </section>
  );
}