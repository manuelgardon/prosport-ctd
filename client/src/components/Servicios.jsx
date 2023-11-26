/* eslint-disable react/prop-types */

import { IconParkingSquare, IconTruckMedical, IconPeople, IconBar } from "./icons";

const serviciosData = [
  { nombre: 'Estacionamiento', icon: <IconParkingSquare/> },
  { nombre: 'Atencion medica', icon: <IconTruckMedical/>},
  { nombre: 'Servicio de alimentos y bebidas', icon: <IconBar/>    },
  { nombre: 'Apto para reuniones y eventos', icon: <IconPeople/>    },
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
      <h2 className="text-2xl text-[#17B289] font-bold mt-10">SERVICIOS</h2>
      <p>
        <small className="text-xl text-[#E1E1E1] font-semi-bold mb-5">Seleccioná los servicios que ofrece tu espacio</small>
      </p>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {serviciosData.map((servicio) => (
          <button
            key={servicio.nombre}
            type="button"
            className={`border border-[#FF9B27] p-4 flex rounded-2xl gap-2 items-center cursor-pointer ${
              selected.includes(servicio.nombre) ? ' bg-green-500' : ''
            }`}
            onClick={() => handleServicioToggle(servicio.nombre)}
          >
            <div className="flex">  
              {servicio.icon}
              <span className="m-5 text-xl text-[#E1E1E1]">{servicio.nombre}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}