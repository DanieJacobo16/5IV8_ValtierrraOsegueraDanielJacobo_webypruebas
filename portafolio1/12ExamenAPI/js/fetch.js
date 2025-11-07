const footballApp = () => {
    const elements = {
        searchInput: document.getElementById("searchInput"),
        btnSearch: document.getElementById("btnSearch"),
        btnPrev: document.getElementById("btnPrev"),
        btnNext: document.getElementById("btnNext"),
        matchesContainer: document.getElementById("matchesContainer"),
        loadingContainer: document.getElementById("loadingContainer"),
        matchDetail: document.getElementById("matchDetail"),
        matchTitle: document.getElementById("matchTitle"),
        matchVideo: document.getElementById("matchVideo"),
        competitionName: document.getElementById("competitionName"),
        matchDate: document.getElementById("matchDate"),
        homeTeam: document.getElementById("homeTeam"),
        awayTeam: document.getElementById("awayTeam"),
        homeScore: document.getElementById("homeScore"),
        awayScore: document.getElementById("awayScore"),
        btnCloseDetail: document.getElementById("btnCloseDetail")
    };

    let currentMatches = [];
    let filteredMatches = [];
    let currentIndex = 0;
    const matchesPerPage = 9;


    const apiUrls = [
        "https://www.scorebat.com/video-api/v3/",
        "https://www.scorebat.com/video-api/v1/",
        "https://apiv3.scorebat.com/video-api/v3/"
    ];


    const sampleMatches = [
        {
            title: "Barcelona 2-1 Real Madrid - La Liga",
            competition: "SPAIN: La Liga",
            date: "2023-10-28T20:00:00+0000",
            side1: { name: "Barcelona" },
            side2: { name: "Real Madrid" },
            videos: [
                {
                    title: "Highlights",
                    embed: `<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>`
                }
            ]
        },
        {
            title: "Manchester City 3-0 Liverpool - Premier League",
            competition: "ENGLAND: Premier League",
            date: "2023-10-29T15:00:00+0000",
            side1: { name: "Manchester City" },
            side2: { name: "Liverpool" },
            videos: [
                {
                    title: "Highlights",
                    embed: `<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>`
                }
            ]
        },
        {
            title: "Bayern Munich 4-2 Borussia Dortmund - Bundesliga",
            competition: "GERMANY: Bundesliga",
            date: "2023-10-27T18:30:00+0000",
            side1: { name: "Bayern Munich" },
            side2: { name: "Borussia Dortmund" },
            videos: [
                {
                    title: "Highlights",
                    embed: `<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>`
                }
            ]
        },
        {
            title: "PSG 1-1 Marseille - Ligue 1",
            competition: "FRANCE: Ligue 1",
            date: "2023-10-26T21:00:00+0000",
            side1: { name: "PSG" },
            side2: { name: "Marseille" },
            videos: [
                {
                    title: "Highlights",
                    embed: `<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>`
                }
            ]
        },
        {
            title: "Juventus 2-0 AC Milan - Serie A",
            competition: "ITALY: Serie A",
            date: "2023-10-25T20:45:00+0000",
            side1: { name: "Juventus" },
            side2: { name: "AC Milan" },
            videos: [
                {
                    title: "Highlights",
                    embed: `<div style="width:100%;height:0px;position:relative;padding-bottom:56.250%;"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden;"></iframe></div>`
                }
            ]
        }
    ];

 
    const getFootballData = async () => {
        for (let i = 0; i < apiUrls.length; i++) {
            try {
                console.log(`Intentando conectar a: ${apiUrls[i]}`);
                const response = await fetch(apiUrls[i]);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data && data.response) {
                    console.log("Datos obtenidos correctamente");
                    return data.response;
                } else {
                    throw new Error("Estructura de datos incorrecta");
                }
            } catch (error) {
                console.warn(`Error con API ${i + 1}:`, error.message);
                
              
                if (i === apiUrls.length - 1) {
                    console.log("Usando datos de ejemplo");
                    return sampleMatches;
                }
            }
        }
    };

    const setLoading = (isLoading) => {
        if (isLoading) {
            elements.loadingContainer.classList.remove("hidden");
            elements.matchesContainer.classList.add("hidden");
        } else {
            elements.loadingContainer.classList.add("hidden");
            elements.matchesContainer.classList.remove("hidden");
        }
    };

    const formatDate = (dateString) => {
        try {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch (error) {
            return "Fecha no disponible";
        }
    };

    const createMatchCards = (matches) => {
        elements.matchesContainer.innerHTML = "";
        
        if (matches.length === 0) {
            elements.matchesContainer.innerHTML = `
                <div class="no-matches">
                    <p>No se encontraron partidos que coincidan con tu búsqueda.</p>
                </div>
            `;
            return;
        }
        
        matches.forEach(match => {
            const matchCard = document.createElement("div");
            matchCard.className = "match-card";
            matchCard.innerHTML = `
                <div class="match-card-header">
                    <h3 class="match-card-title">${match.title}</h3>
                    <p class="match-card-competition">${match.competition}</p>
                </div>
                <div class="match-card-body">
                    <div class="match-card-teams">
                        <div class="team-name">${match.side1?.name || "Equipo local"}</div>
                        <div class="vs">VS</div>
                        <div class="team-name">${match.side2?.name || "Equipo visitante"}</div>
                    </div>
                    <div class="match-card-score">${match.videos?.[0]?.title || "Resumen"}</div>
                    <div class="match-card-date">${formatDate(match.date)}</div>
                </div>
            `;
            
            matchCard.addEventListener("click", () => showMatchDetail(match));
            elements.matchesContainer.appendChild(matchCard);
        });
    };

    const showMatchDetail = (match) => {
        elements.matchTitle.textContent = match.title || "Partido de fútbol";
        elements.competitionName.textContent = match.competition || "Competición";
        elements.matchDate.textContent = formatDate(match.date);
        elements.homeTeam.textContent = match.side1?.name || "Equipo local";
        elements.awayTeam.textContent = match.side2?.name || "Equipo visitante";
        
        
        const scoreMatch = match.title?.match(/(\d+)\s*-\s*(\d+)/);
        if (scoreMatch) {
            elements.homeScore.textContent = scoreMatch[1];
            elements.awayScore.textContent = scoreMatch[2];
        } else {
            elements.homeScore.textContent = "-";
            elements.awayScore.textContent = "-";
        }
        
        if (match.videos && match.videos[0] && match.videos[0].embed) {
            elements.matchVideo.innerHTML = match.videos[0].embed;
        } else {
            elements.matchVideo.innerHTML = `
                <div class="no-video">
                    <i class="fa-solid fa-video-slash" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <p>Video no disponible</p>
                    <p>Este es un partido de ejemplo con datos demostrativos</p>
                </div>
            `;
        }
        
        elements.matchDetail.classList.remove("hidden");
    };

    const filterMatches = (searchTerm) => {
        if (!searchTerm) {
            filteredMatches = [...currentMatches];
        } else {
            const term = searchTerm.toLowerCase();
            filteredMatches = currentMatches.filter(match => 
                (match.title && match.title.toLowerCase().includes(term)) ||
                (match.competition && match.competition.toLowerCase().includes(term)) ||
                (match.side1?.name && match.side1.name.toLowerCase().includes(term)) ||
                (match.side2?.name && match.side2.name.toLowerCase().includes(term))
            );
        }
        
        currentIndex = 0;
        createMatchCards(filteredMatches.slice(currentIndex, currentIndex + matchesPerPage));
        updateNavigationButtons();
    };

    const updateNavigationButtons = () => {
        elements.btnPrev.disabled = currentIndex === 0;
        elements.btnNext.disabled = currentIndex + matchesPerPage >= filteredMatches.length;
    };

    const goToPrevPage = () => {
        if (currentIndex > 0) {
            currentIndex -= matchesPerPage;
            createMatchCards(filteredMatches.slice(currentIndex, currentIndex + matchesPerPage));
            updateNavigationButtons();
        }
    };

    const goToNextPage = () => {
        if (currentIndex + matchesPerPage < filteredMatches.length) {
            currentIndex += matchesPerPage;
            createMatchCards(filteredMatches.slice(currentIndex, currentIndex + matchesPerPage));
            updateNavigationButtons();
        }
    };

    const initApp = async () => {
        setLoading(true);
        
        try {
            currentMatches = await getFootballData();
            
            if (currentMatches && currentMatches.length > 0) {
                filteredMatches = [...currentMatches];
                createMatchCards(filteredMatches.slice(0, matchesPerPage));
                updateNavigationButtons();
                
               
                if (currentMatches === sampleMatches) {
                    setTimeout(() => {
                        Swal.fire({
                            title: "Modo Demo",
                            text: "Estás viendo datos de ejemplo. La API de ScoreBat podría no estar disponible temporalmente.",
                            icon: "info",
                            confirmButtonText: "Entendido",
                        });
                    }, 1000);
                }
            } else {
                throw new Error("No se obtuvieron partidos");
            }
        } catch (error) {
            console.error("Error al inicializar la aplicación:", error);
            
            
            currentMatches = sampleMatches;
            filteredMatches = [...currentMatches];
            createMatchCards(filteredMatches.slice(0, matchesPerPage));
            updateNavigationButtons();
            
            Swal.fire({
                title: "Modo Demo Activado",
                text: "No se pudieron cargar los resúmenes en tiempo real. Mostrando datos de ejemplo.",
                icon: "warning",
                confirmButtonText: "Entendido",
            });
        } finally {
            setLoading(false);
        }
    };

    
    const setupEventListeners = () => {
        
        elements.btnSearch.addEventListener("click", () => {
            filterMatches(elements.searchInput.value);
        });
        
        elements.searchInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                filterMatches(elements.searchInput.value);
            }
        });
        
        
        elements.btnPrev.addEventListener("click", goToPrevPage);
        elements.btnNext.addEventListener("click", goToNextPage);
    
        elements.btnCloseDetail.addEventListener("click", () => {
            elements.matchDetail.classList.add("hidden");
        });
        
        
        elements.matchDetail.addEventListener("click", (event) => {
            if (event.target === elements.matchDetail) {
                elements.matchDetail.classList.add("hidden");
            }
        });
    };

    initApp();
    setupEventListeners();
};
/**
SI lee esto, no le voy a mentir, si use un poco de IA para hacerlo bien y ver en que me equivocaba, srry :(, pero todo lo hice yo, solo le preguntaba q chow, como era cada coda y eso, no me dio el codigo completo, solo me ayudo a corregir errores y optimizar, solo como datazo, por lo mientras, que opina de mi pagina eh? muy instagram 2014 con el degrade de fondo no? 
 */

window.onload = footballApp;