/* eslint-disable react/prop-types */
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

export default function FormReserva({
    fechaReserva,
    horaInicio,
    handleChangeHoraInicio,
    horaFin,
    handleChangeHoraFin,
    precioTotal,
    handleReserva,
    setFechaReserva,
    diasDisponibles,
}) {
    const fechaMaxima = diasDisponibles ? new Date(Math.max(...diasDisponibles.map(date => new Date(date)))) : new Date();
    return (
        <section className="">
            <form className="flex flex-col place-content-center w-[400px] bg-opacity-70 backdrop-blur-lg bg-[#525252] px-4 py-4 rounded-lg" onSubmit={handleReserva}>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-[#E1E1E1] text-xl mb-3">
                        Fecha de inicio:
                    </label>
                    <DatePicker
                        value={fechaReserva.toString().split('T')[0]}
                        onChange={(date) => setFechaReserva(date)}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-600"
                            />
                        )}
                        format="dd/MM/yyyy"
                        dateConstraints={{
                            start: new Date(),
                            end: fechaMaxima,
                        }}

                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-[#E1E1E1] text-xl mb-3">
                        Hora de inicio:
                    </label>
                    <TimePicker
                        value={horaInicio}
                        onChange={handleChangeHoraInicio}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-600"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endTime" className="block text-[#E1E1E1] text-xl mb-3">
                        Hora de fin:
                    </label>
                    <TimePicker
                        value={horaFin}
                        onChange={handleChangeHoraFin}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-100"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>
                {precioTotal && (
                    <div className="mb-4">
                        <label htmlFor="precioTotal" className="block text-[#E1E1E1] text-xl mb-3">
                            Precio Total:
                        </label>
                        <p className="text-xl text-[#FF9B27]">${precioTotal}</p>
                    </div>
                )}
                <button type="submit" className="bg-green-500 text-white p-2 rounded-md mt-2 w-full transition-colors duration-300 ease-in-out hover:bg-green-600">Reservar</button>
            </form>
        </section>
    );
}