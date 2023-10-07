// Burger menu

const bars = document.getElementsByClassName("bar");
const burger = document.getElementById("burger-menu");
burger.addEventListener("click", () => {
    const menu = document.getElementById("collapse-menu");
    menu.style.display = "block";
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "var(--light)";
    }
    // Close menu when click outside
    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
            menu.style.display = "none";
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = "var(--dark)";
            }
        }
    });
    // Close menu when click on link
    const links = document.getElementsByClassName("nav-link");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", () => {
            menu.style.display = "none";
            for (let i = 0; i < bars.length; i++) {
                bars[i].style.backgroundColor = "var(--dark)";
            }
        });
    }
});

const close = document.getElementById("close-menu");
close.addEventListener("click", () => {
    const menu = document.getElementById("collapse-menu");
    menu.style.display = "none";
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "var(--dark)";
    }
});

close.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const menu = document.getElementById("collapse-menu");
        menu.style.display = "none";
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "var(--dark)";
        }
    }
});