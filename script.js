const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.innerHTML = "☀️";
    } else {
        darkModeBtn.innerHTML = "🌙";
    }
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;

        const increment = target / 100;

        if (current < target) {

            counter.innerText = `${Math.ceil(current + increment)}`;

            setTimeout(updateCounter, 20);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});