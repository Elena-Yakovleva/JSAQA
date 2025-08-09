
const booking = require("../../selectors/booking/booking.json");

describe("Booking tickets", () => {

    beforeEach(() => {
        cy
            .visit("client/index.php");
        cy
            .title().should("eq", "ИдёмВКино");
    }); 

    it("Successful booking ticket", () => {
        cy
            .get(booking.day)
            .should("be.visible").click();
        cy
            .get(booking.movieTitle)
            .should("be.visible")
            .should("have.text", "Мир Юрского периода");
        cy
            .get(booking.movieHall)
            .should("be.visible")
            .should("have.text", "777 зал");
        cy
            .get(booking.movieTime)
            .should("be.visible")
            .should("have.text", "22:00")
            .click();
        cy
            .url()
            .should("eq", "http://qamid.tmweb.ru/client/hall.php");
        cy
            .get(booking.buyingTitle)
            .should("be.visible")
            .should("have.text", "Мир Юрского периода");
        cy
            .get(booking.button)
            .should("be.disabled");
        cy
            .get(booking.seat)
            .click();
        cy
            .get(booking.button)
            .should("be.visible")
            .should("not.be.disabled");
        cy
            .get(booking.button)
            .click();
        cy
            .url()
            .should("eq", "http://qamid.tmweb.ru/client/payment.php");
        cy
            .get(booking.button)
            .should("have.text", "Получить код бронирования")
            .click();
        cy
            .url()
            .should("eq", "http://qamid.tmweb.ru/client/ticket.php");
        cy
            .get(booking.ticketTitle)
            .should("have.text", "Электронный билет");
        cy
            .get(booking.qr)
            .should("be.visible");
        
    });
});
