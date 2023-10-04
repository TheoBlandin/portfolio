
// Navbar scroll

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


// Update when resize

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


// Clouds

function addCloud() {
    const sky = document.getElementById("sky");
    const cloud = document.createElement("img");
    cloud.src = "assets/cloud.svg";
    cloud.classList.add("cloud");
    cloud.style.bottom = Math.floor(Math.random() * 100) + "%";
    cloud.style.width = (Math.floor(Math.random() * (450 - 150 + 1)) + 150).toString() + "px";
    cloud.style.opacity = 0.3 + Math.random() * 0.5;
    cloud.style.animationDuration = (Math.floor(Math.random() * (50 - 20 + 1)) + 20).toString() + "s";
    cloud.addEventListener("animationend", () => {
        sky.removeChild(cloud);
    });
    sky.appendChild(cloud);
}

function startClouds() {
    addCloud();
    document.getElementById("pause-icon").src="assets/pause.svg";
    document.getElementById("msg-pause").innerHTML = "Pauser l'animation"
    document.getElementById("btn-pause").removeEventListener("click", startClouds);
    cloudInterval = setInterval(addCloud, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);
    clouds = document.getElementsByClassName("cloud");
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].classList.remove("paused");
    }
}

function stopClouds() {
    document.getElementById("pause-icon").src="assets/play.svg";
    document.getElementById("msg-pause").innerHTML = "Lancer l'animation"
    document.getElementById("btn-pause").removeEventListener("click", stopClouds);
    document.getElementById("btn-pause").addEventListener("click", startClouds);
    clearInterval(cloudInterval);
    clouds = document.getElementsByClassName("cloud");
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].classList.add("paused");
    }
}

document.getElementById("btn-pause").addEventListener("click", () => {
    stopClouds();
});

startClouds();


// Projects

const div = document.getElementById("projects");
fetch('assets/projects.json')
  .then((response) => response.json())
  .then((data) => {
    const projects = data.projects;
    for (let i = 0; i < projects.length; i++) {
        const project = document.createElement("div");
        project.classList.add("project");
        project.tabIndex = 0;
        project.innerHTML = `
            <div class="icon-project" id="icon-project-${i}"></div>
            <div class="description-project">
                <div>
                    <h4>${projects[i].title}</h4>
                    <p>${projects[i].shortDescription}</p>
                </div>
                <div>
                    <p>Technologies utilisées</p>
                    <div id="techno-${i}" class="techno"></div>
                </div>
            </div>
        `
        
        div.appendChild(project);
        document.getElementById(`icon-project-${i}`).style.backgroundColor = projects[i].backgroundColor;
        for (let j = 0; j < projects[i].techno.length; j++) {
            const div = document.createElement("div");
            div.classList.add("techno-box");
            div.tabIndex = 0;
            const techno = document.createElement("img");
            techno.src = `assets/techno/${projects[i].techno[j].toLowerCase()}.svg`;
            techno.alt = projects[i].techno[j];
            div.appendChild(techno);
            const infoBox = document.createElement("div");
            infoBox.classList.add("info-box");
            infoBox.innerHTML = projects[i].techno[j];
            div.appendChild(infoBox);
            document.getElementById(`techno-${i}`).appendChild(div);
        }
    }
  })