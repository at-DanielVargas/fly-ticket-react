const currency = amount => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount);

const LANG = 'es-ES';

const dateFormat = dateString => {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString(LANG, { weekday: 'short' });
    const month = date.toLocaleDateString(LANG, { month: 'short' });
    const day = date.toLocaleDateString(LANG, { day: '2-digit' });
    return `${weekday}, ${day} ${month}`;
};

const timeFormat = dateString => {
    const date = new Date(dateString);
    return date
        .toLocaleTimeString(LANG, {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        })
        .toUpperCase();
};

const timeDiff = (dateFuture, dateNow, shortDisplay) => {
    let diffInMilliSeconds = Math.abs(new Date(dateFuture).getTime() - new Date(dateNow).getTime()) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';

    const dayWord = plural => (shortDisplay ? 'd' : plural ? 'días' : 'día');
    const hourWord = plural => (shortDisplay ? 'h' : plural ? 'horas' : 'hora');
    const minuteWord = plural => (shortDisplay ? 'm' : plural ? 'minutos' : 'minuto');

    if (days > 0) {
        difference += days === 1 ? `${days} ${dayWord()}, ` : `${days} ${dayWord(true)}, `;
    }

    difference += hours === 0 || hours === 1 ? `${hours} ${hourWord()}, ` : `${hours} ${hourWord(true)}, `;

    difference += minutes === 0 || hours === 1 ? `${minutes} ${minuteWord(true)}` : `${minutes} ${minuteWord(true)}`;

    return difference;
};

export const DisplayUtil = {
    currency,
    dateFormat,
    timeFormat,
    timeDiff
};
