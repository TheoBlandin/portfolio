const navbar = document.getElementById("nav");
const navLinks = document.getElementsByClassName("nav-link");

document.addEventListener("scroll", () => {
    if (window.scrollY > 85) { 
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
const heightScreen = window.innerHeight;
document.getElementById("triangle").style.borderRight = widthScreen + "px solid transparent";
window.addEventListener("resize", updateWidthScreen);

function updateWidthScreen() {
    const widthScreen = window.innerWidth;
    document.getElementById("triangle").style.borderRight = widthScreen + "px solid transparent";
    document.getElementById("full-height").style.height = "100%";
    document.getElementById("full-height").style.width = "100%";
}

function addCloud() {
    const sky = document.getElementById("sky");
    const cloud = document.createElement("img");
    cloud.src = "assets/cloud.svg";
    cloud.classList.add("cloud");
    cloud.style.bottom = Math.floor(Math.random() * 100) + "%";
    cloud.style.width = (Math.floor(Math.random() * (450 - 150 + 1)) + 150).toString() + "px";
    cloud.style.opacity = 0.3 + Math.random() * 0.5;
    cloud.style.animationDuration = (Math.floor(Math.random() * (50 - 15 + 1)) + 15).toString() + "s";
    sky.appendChild(cloud);
}

addCloud();
setInterval(addCloud, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);