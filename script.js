const navbar = document.getElementById("nav");
const navLinks = document.getElementsByClassName("nav-link");

window.addEventListener("scroll", () => {
    if (window.scrollY > 75) { 
        navbar.style.backgroundColor = "#333333"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#ffffff";
        }
    } else {
        navbar.style.backgroundColor = "transparent"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#333333";
        }
    }
});

const widthScreen = window.innerWidth;
document.getElementById("triangle").style.borderRight = widthScreen + "px solid transparent";