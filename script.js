
// Navbar scroll

const navbar = document.getElementById("nav");
const navLinks = document.getElementsByClassName("nav-link");
const menu = document.getElementsByClassName("bar");

document.addEventListener("scroll", () => {
    if (window.scrollY > 85) { 
        navbar.style.backgroundColor = "#333333"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#ffffff";
        }
        for (let i = 0; i < menu.length; i++) {
            menu[i].style.backgroundColor = "#ffffff";
        }
    } else {
        navbar.style.backgroundColor = "transparent"; 
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].style.color = "#333333";
        }
        for (let i = 0; i < menu.length; i++) {
            menu[i].style.backgroundColor = "black";
        }
    }
});


// Clouds

function addCloud() {
    const sky = document.getElementById("sky");
    const cloud = document.createElement("img");
    cloud.src = "assets/icons/cloud.svg";
    cloud.classList.add("cloud");
    cloud.alt = "";
    cloud.ariaHidden = true;
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
    document.getElementById("pause-icon").src="assets/icons/pause.svg";
    document.getElementById("msg-pause").innerHTML = "Pauser l'animation"
    document.getElementById("btn-pause").removeEventListener("click", startClouds);
    cloudInterval = setInterval(addCloud, Math.floor(Math.random() * (8000 - 2500 + 1)) + 2500);
    clouds = document.getElementsByClassName("cloud");
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].classList.remove("paused");
    }
}

function stopClouds() {
    document.getElementById("pause-icon").src="assets/icons/play.svg";
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
        var projectTitle = projects[i].title;
        const linkTo = document.createElement("a");
        linkTo.classList.add("project-link");
        linkTo.href = projects[i].link;
        linkTo.innerHTML = `
            <div class="project">
                <div class="scotch vertical-scotch"></div>
                <div class="icon-project" id="icon-project-${i}"></div>
                <div class="description-project">
                    <div>
                        <h4 id=title-project-${i}>${projectTitle}</h4>
                        <p>${projects[i].shortDescription}</p>
                    </div>
                    <div>
                        <p>Technologies utilisées :</p>
                        <div id="techno-${i}" class="techno"></div>
                    </div>
                </div>
            <div>
        `;
        

        div.appendChild(linkTo);

        document.getElementById(`icon-project-${i}`).style.backgroundColor = projects[i].backgroundColor;
        document.getElementById(`icon-project-${i}`).style.backgroundImage = `url(${projects[i].icon})`;

        if (projects[i].lang == "en") {
            document.getElementById(`title-project-${i}`).lang = "en";
        }


        if (projects[i].title == "Manger de saison") {
            document.getElementById(`icon-project-${i}`).style.backgroundPosition = "bottom";
        } else if (projects[i].title == "NerdLister") {
            document.getElementById(`icon-project-${i}`).classList.add("nerdlister");
        }

        technos = (projects[i].techno).sort(); // Sort technologies alphabetically
        for (let j = 0; j < technos.length; j++) {
            const div = document.createElement("div");
            div.classList.add("techno-box");
            div.tabIndex = 0;

            const techno = document.createElement("img"); // icon
            techno.src = `assets/techno/${technos[j].toLowerCase()}.svg`;
            techno.alt = technos[j];
            techno.loading = "lazy";
            div.appendChild(techno);

            const infoBox = document.createElement("div"); // infobox on hover/focus
            infoBox.classList.add("info-box");
            infoBox.ariaHidden = true;
            infoBox.innerHTML = technos[j];
            div.appendChild(infoBox);

            document.getElementById(`techno-${i}`).appendChild(div);
        }
    }
  })