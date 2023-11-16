/* eslint-disable react/prop-types */

// este componente renderiza la alerta para que el usuario confirme o no la eliminacion del elemento de sus favoritos
export default function EspacioFavoritoAlerta({ handleCancel, eliminarFavorito, espacioPorEliminar }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-md">
                <h2 className="text-xl">¿Estás seguro de que deseas eliminar este espacio?</h2>
                <div className="flex justify-end gap-3 mt-10">
                    <button onClick={handleCancel}>CANCELAR</button>
                    <button onClick={() => eliminarFavorito(espacioPorEliminar)}>CONFIRMAR</button>
                </div>
            </div>
        </div>
    )
}