export const COOKIE_EXPIRED = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
export const COOKIE_FAVORITOS_EXPIRED = 'favoritos=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'


export function getInitials(nombre, apellido){
    let initials = '';

    if (nombre) {
        initials += nombre[0].toUpperCase();
    }

    if (apellido) {
        initials += apellido[0].toUpperCase();
    }

    return initials;
}