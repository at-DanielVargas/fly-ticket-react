const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const rules = auth.rewriter({
    users: 600,
    reservations: 640,
    cities: 444,
    states: 444
});
const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '/db.json'), {
    foreignKeySuffix: '_id'
});

app.db = router.db;

// app.use(jsonServer.bodyParser());

const generate_hours = step => {
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
        rc.push(
            dt.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        );
        dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
};

const generateDate = (dateString, timeString, aditionalHours, aditionalMinutes) => {
    const D = dateString.split('-').map((it, index) => {
        if (index === 1) {
            return parseInt(it) - 1;
        }
        return parseInt(it);
    });
    const T = timeString.split(':').map(h => parseInt(h));
    const returnDate = new Date(...D.concat(T));
    if (aditionalHours) {
        returnDate.setHours(returnDate.getHours() + aditionalHours);
    }
    if (aditionalMinutes) {
        returnDate.setMinutes(returnDate.getMinutes() + aditionalMinutes);
    }
    return returnDate;
};

app.use(cors());
app.get('/flights', (req, res, next) => {
    let departureCity = req.query.departure ?? '';
    let arrivalCity = req.query.arrival ?? '';
    let departureDate = req.query.departureDate;
    let arrivalDate = req.query.departureDate;

    const flights = [];
    const hours = generate_hours(faker.datatype.number({ min: 10, max: 30 }));

    hours.forEach((hour, index) => {
        const arrivalHours = hours.slice(index);

        const seats = [];

        Array(30)
            .fill({})
            .forEach(row => {
                const seatsRow = [];
                Array.from('ABCDEF').forEach(letter => {
                    const seat = {
                        id: faker.random.uuid(),
                        seat: letter,
                        price: faker.datatype.number({ min: 100, max: 400 }),
                        available: faker.random.boolean()
                    };
                    seatsRow.push(seat);
                });
                seats.push(seatsRow);
            });

        const aditionalHours = faker.datatype.number({ min: 1, max: 6 });
        const aditionalMinutes = faker.datatype.number({ min: 0, max: 59 });
        const departureDateNative = generateDate(departureDate, hour);
        const flight = {
            id: index + 1,
            code: `${faker.random.alphaNumeric(5).toUpperCase()}`,
            departureTime: departureDateNative,
            arrivalTime: generateDate(departureDate, hour, aditionalHours, aditionalMinutes),
            departureCity,
            arrivalCity,
            departureDate: departureDateNative,
            arrivalDate: departureDateNative,
            cost: parseFloat(faker.commerce.price(900, 5000)),
            seats,
            availableSeats: seats.reduce((acc, row) => acc + row.filter(seat => seat.available).length, 0),
            inOffer: faker.random.boolean()
        };
        flights.push(flight);
    });

    // setTimeout(() => {
    res.json({ flights });
    // }, 9000);
});

app.use(rules);
app.use(auth);
app.use(router);
app.listen(process.env.PORT || 3001, () => {
    console.log('JSON Server is running');
});
