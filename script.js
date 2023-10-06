
// Navbar scroll

const navbar = document.getElementById("nav");
const navLinks = document.getElementsByClassName("nav-link");
const bars = document.getElementsByClassName("bar");

document.addEventListener("scroll", () => {
    if (window.scrollY > 85) { 
        navbar.style.backgroundColor = "#333333"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#ffffff";
        }
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "#ffffff";
        }
    } else {
        navbar.style.backgroundColor = "transparent"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#333333";
        }
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = "black";
        }
    }
});


// Burger menu

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


// Update when resize

// const widthScreen = window.innerWidth;
// console.log(widthScreen)
// document.getElementById("triangle").style.borderRight = widthScreen + "px solid transparent";
// window.addEventListener("resize", updateWidthScreen);

// function updateWidthScreen() {
//     console.log("update")
//     console.log(window.innerWidth - 20)
//     document.getElementById("triangle").style.borderRight = (window.innerWidth - 20) + "px solid transparent";
//     // document.getElementById("sky").style.height = "100vh";
//     document.getElementById("sky").style.width = "100vw";
// }


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

// startClouds();


// Projects

const div = document.getElementById("projects");
fetch('assets/projects.json')
  .then((response) => response.json())
  .then((data) => {
    const projects = data.projects;
    for (let i = 0; i < projects.length; i++) {
        const project = document.createElement("div"); // card project
        project.classList.add("project");
        project.tabIndex = 0;
        project.innerHTML = `
            <div class="scotch vertical-scotch"></div>
            <div class="icon-project" id="icon-project-${i}"></div>
            <div class="description-project">
                <div>
                    <h4>${projects[i].title}</h4>
                    <p>${projects[i].shortDescription}</p>
                </div>
                <div>
                    <p>Technologies utilisées :</p>
                    <div id="techno-${i}" class="techno"></div>
                </div>
            </div>
        `
        
        div.appendChild(project);
        document.getElementById(`icon-project-${i}`).style.backgroundColor = projects[i].backgroundColor;
        document.getElementById(`icon-project-${i}`).style.backgroundImage = `url(${projects[i].icon})`;
        if (projects[i].title == "Manger de saison") {
            document.getElementById(`icon-project-${i}`).style.backgroundPosition = "bottom";
        }

        technos = (projects[i].techno).sort(); // Sort technologies alphabetically
        for (let j = 0; j < technos.length; j++) {
            const div = document.createElement("div");
            div.classList.add("techno-box");
            div.tabIndex = 0;

            const techno = document.createElement("img"); // icon
            techno.src = `assets/techno/${technos[j].toLowerCase()}.svg`;
            techno.alt = technos[j];
            div.appendChild(techno);

            const infoBox = document.createElement("div"); // infobox for accessibility
            infoBox.classList.add("info-box");
            infoBox.innerHTML = technos[j];
            div.appendChild(infoBox);

            document.getElementById(`techno-${i}`).appendChild(div);
        }
    }
  })