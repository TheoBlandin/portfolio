const div = document.getElementById("galery");
fetch('assets/galery.json')
    .then((response) => response.json())
    .then((data) => {
        const projects = data.projects;

        for (let i = 0; i < projects.length; i++) {
            var divGalery = document.createElement("div");
            divGalery.className = "div-galery";
            
            var divProject = document.createElement("div");
            divProject.className = "img-project";
            divProject.style.backgroundImage = "url(" + projects[i].icon + ")";
            divProject.style.backgroundColor = projects[i].backgroundColor;

            divGalery.appendChild(divProject);
            div.appendChild(divGalery);
        }
    });