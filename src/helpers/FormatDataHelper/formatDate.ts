export const formatDateBr = (input: string) => {
    const __isLeapYear = function (year: number) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const daysInMonth = function (year?: number) {
        return [
            null,
            31,
            !year || __isLeapYear(year) ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];
    };
    let v = input.replace(/[^0-9/]/g, ''); // Agora permite dígitos e barras
    if (v.length > 10) {
        v = v.slice(0, 10); // Limita a entrada a 10 caracteres
    }
    if (v.length > 2 && v[2] !== '/') {
        v = v.slice(0, 2) + '/' + v.slice(2);
    }
    if (v.length > 5 && v[5] !== '/') {
        v = v.slice(0, 5) + '/' + v.slice(5);
    }
    for (let i = 0; i < v.length; i++) {
        if (
            (i === 0 ||
                i === 1 ||
                i === 3 ||
                i === 4 ||
                i === 6 ||
                i === 7 ||
                i === 8 ||
                i === 9) &&
            v[i] === '/'
        ) {
            v = v.slice(0, i);
        }
    }
    let day, month, year;
    if (v.length >= 2) {
        if (parseInt(v.slice(0, 2)) === 0) {
            v = '01';
        } else if (parseInt(v.slice(0, 2)) > 31) {
            v = '31';
        }
        day = parseInt(v.slice(0, 2));
    }

    if (v.length >= 5) {
        month = parseInt(v.slice(3, 5));
        if (month === 0) {
            v = v.slice(0, 3) + '01';
            month = 1;
        } else if (month > 12) {
            v = v.slice(0, 3) + '12';
            month = 12;
        }

        const dm = daysInMonth()[month];

        if (dm && day && day > dm) {
            day = dm;
            v = String(day).padStart(2, '0') + v.slice(2, 5);
        }
    }

    if (v.length === 10 && month) {
        year = parseInt(v.slice(6, 10));

        const dmY = daysInMonth(year)[month];

        if (dmY && day && day > dmY) {
            day = dmY;
            v = String(day).padStart(2, '0') + v.slice(2, 10);
        }
    }

    return v;
};
