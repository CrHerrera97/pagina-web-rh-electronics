document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        return;
    }

    emailjs.init({
        publicKey: "R3PLWk5v_S7xLmiFh"
    });

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.sendForm("service_i23uo79", "template_ls26azj", this)
            .then(function () {
                alert("Mensaje enviado correctamente.");
                contactForm.reset();
            })
            .catch(function (error) {
                alert("No se pudo enviar el mensaje. Inténtalo nuevamente.");
                console.error("EmailJS Error:", error);
            });
    });
});
