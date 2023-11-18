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
    setFechaReserva
}) {
    return (
        <section className="mt-10">
            <form className="w-full max-w-sm mx-auto bg-slate-600" onSubmit={handleReserva}>
                <div className="mb-4">
                    <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                        Fecha de inicio de reserva:
                    </label>
                    <DatePicker
                        value={fechaReserva}
                        onChange={(date) => setFechaReserva(date)}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-600"
                            />
                        )}
                        format="dd/MM/yyyy"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">
                        Hora de inicio de reserva:
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
                    <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">
                        Hora de finalización de reserva:
                    </label>
                    <TimePicker
                        value={horaFin}
                        onChange={handleChangeHoraFin}
                        renderInput={(props) => (
                            <input
                                {...props.inputProps}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-primary-600"
                            />
                        )}
                        ampm={false}
                        minutesStep={60}
                    />
                </div>
                {precioTotal && (
                    <div className="mb-4">
                        <label htmlFor="precioTotal" className="block text-gray-700 text-sm font-bold mb-2">
                            Precio Total:
                        </label>
                        <p>${precioTotal}</p>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-primary-600"
                >
                    Reservar
                </button>
            </form>
        </section>
    );
}