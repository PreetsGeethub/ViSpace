document.addEventListener("DOMContentLoaded", () => {
  const constellations = document.querySelectorAll(".constellation");
  const infoPanel = document.getElementById("constellation-info");
  const galaxyInfo = document.getElementById("galaxy-info");
  
  // Generate background stars
  function generateBackgroundStars() {
    const container = document.getElementById("background-stars");
    for (let i = 0; i < 100; i++) {
      const star = document.createElement("div");
      star.className = "bg-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.animationDelay = Math.random() * 3 + "s";
      star.style.animationDuration = (2 + Math.random() * 4) + "s";
      container.appendChild(star);
    }
  }
  
  generateBackgroundStars();
  
  // Constellation data
  const constellationData = {
    orion: {
      title: "Orion",
      description: "The Hunter. Known for its iconic belt of three stars and the Orion Nebula. One of the most recognizable constellations visible throughout winter.",
      missions: ["🚀 Orion I – Deep Space Probe", "🛰️ Orion II – Mars Relay Mission", "🌟 Orion III – Stellar Observatory", "🔭 Betelgeuse Monitor"]
    },
    cassiopeia: {
      title: "Cassiopeia",
      description: "The Queen. Distinctive W-shaped constellation visible year-round in northern skies. Contains several notable star clusters.",
      missions: ["📡 Cassini Follow-up Mission", "🔭 Deep Sky Survey", "🛸 Exoplanet Hunter", "⭐ Variable Star Monitor"]
    },
    cygnus: {
      title: "Cygnus",
      description: "The Swan. Also known as the Northern Cross, flying along the Milky Way. Home to many nebulae and the mysterious Cygnus X-1 black hole.",
      missions: ["🦢 Swan Navigation System", "✨ Galactic Plane Mapper", "🌌 Dark Matter Detector", "🕳️ Black Hole Explorer"]
    }
  };

  // Get star center position relative to the constellation map container
  function getStarCenter(star) {
    const rect = star.getBoundingClientRect();
    const mapRect = document.getElementById("constellation-map").getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - mapRect.left,
      y: rect.top + rect.height / 2 - mapRect.top
    };
  }

  // Clear all constellation selections
  function clearAll() {
    constellations.forEach(constellation => {
      constellation.classList.remove("active");
      const stars = constellation.querySelectorAll(".star");
      stars.forEach(star => star.classList.remove("selected"));
    });
    
    // Hide all lines
    document.querySelectorAll(".constellation-line").forEach(line => {
      line.classList.remove("visible");
    });
    
    infoPanel.classList.remove("visible");
    infoPanel.innerHTML = "";
    galaxyInfo.classList.remove("visible");
  }

  // Update lines for a specific constellation
  function updateLines(constellationId) {
    const constellation = document.getElementById(constellationId);
    const stars = constellation.querySelectorAll(".star");
    
    if (constellationId === "orion" && stars.length >= 3) {
      // Connect Orion's belt
      const pos1 = getStarCenter(stars[0]);
      const pos2 = getStarCenter(stars[1]);
      const pos3 = getStarCenter(stars[2]);
      
      const line1 = document.getElementById("orion-line1");
      const line2 = document.getElementById("orion-line2");
      const line3 = document.getElementById("orion-line3");
      
      // Star1 to Star2
      line1.setAttribute("x1", pos1.x);
      line1.setAttribute("y1", pos1.y);
      line1.setAttribute("x2", pos2.x);
      line1.setAttribute("y2", pos2.y);
      
      // Star2 to Star3
      line2.setAttribute("x1", pos2.x);
      line2.setAttribute("y1", pos2.y);
      line2.setAttribute("x2", pos3.x);
      line2.setAttribute("y2", pos3.y);
      
      // Star1 to Star3 (completing triangle)
      line3.setAttribute("x1", pos1.x);
      line3.setAttribute("y1", pos1.y);
      line3.setAttribute("x2", pos3.x);
      line3.setAttribute("y2", pos3.y);
      
      // Show lines
      [line1, line2, line3].forEach(line => line.classList.add("visible"));
    }
    
    if (constellationId === "cassiopeia" && stars.length >= 4) {
      // Connect Cassiopeia's W shape
      const positions = Array.from(stars).map(star => getStarCenter(star));
      
      const line1 = document.getElementById("cassiopeia-line1");
      const line2 = document.getElementById("cassiopeia-line2");
      const line3 = document.getElementById("cassiopeia-line3");
      
      // Connect in W pattern
      line1.setAttribute("x1", positions[0].x);
      line1.setAttribute("y1", positions[0].y);
      line1.setAttribute("x2", positions[1].x);
      line1.setAttribute("y2", positions[1].y);
      
      line2.setAttribute("x1", positions[1].x);
      line2.setAttribute("y1", positions[1].y);
      line2.setAttribute("x2", positions[2].x);
      line2.setAttribute("y2", positions[2].y);
      
      line3.setAttribute("x1", positions[2].x);
      line3.setAttribute("y1", positions[2].y);
      line3.setAttribute("x2", positions[3].x);
      line3.setAttribute("y2", positions[3].y);
      
      [line1, line2, line3].forEach(line => line.classList.add("visible"));
    }
    
    if (constellationId === "cygnus" && stars.length >= 4) {
      // Connect Cygnus cross pattern
      const positions = Array.from(stars).map(star => getStarCenter(star));
      
      const line1 = document.getElementById("cygnus-line1");
      const line2 = document.getElementById("cygnus-line2");
      const line3 = document.getElementById("cygnus-line3");
      
      // Cross pattern
      line1.setAttribute("x1", positions[0].x);
      line1.setAttribute("y1", positions[0].y);
      line1.setAttribute("x2", positions[2].x);
      line1.setAttribute("y2", positions[2].y);
      
      line2.setAttribute("x1", positions[1].x);
      line2.setAttribute("y1", positions[1].y);
      line2.setAttribute("x2", positions[3].x);
      line2.setAttribute("y2", positions[3].y);
      
      line3.setAttribute("x1", positions[0].x);
      line3.setAttribute("y1", positions[0].y);
      line3.setAttribute("x2", positions[1].x);
      line3.setAttribute("y2", positions[1].y);
      
      [line1, line2, line3].forEach(line => line.classList.add("visible"));
    }
  }

  // Show constellation info
  function showInfo(constellationId) {
    const data = constellationData[constellationId];
    if (data) {
      let html = `<h3>${data.title}</h3><p>${data.description}</p><ul>`;
      data.missions.forEach(mission => {
        html += `<li>${mission}</li>`;
      });
      html += "</ul>";
      infoPanel.innerHTML = html;
      infoPanel.classList.add("visible");
    }
  }

  // Add click handlers to constellations
  constellations.forEach(constellation => {
    constellation.addEventListener("click", (e) => {
      e.stopPropagation();
      const constellationId = constellation.id;
      const isActive = constellation.classList.contains("active");
      
      clearAll();
      
      if (!isActive) {
        constellation.classList.add("active");
        const stars = constellation.querySelectorAll(".star");
        stars.forEach(star => star.classList.add("selected"));
        
        updateLines(constellationId);
        showInfo(constellationId);
      }
    });
  });

  // Add click handlers to individual stars
  document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", (e) => {
      e.stopPropagation();
      const constellation = star.closest(".constellation");
      const constellationId = constellation.id;
      
      clearAll();
      
      constellation.classList.add("active");
      star.classList.add("selected");
      
      updateLines(constellationId);
      showInfo(constellationId);
    });
  });

  // Clear selection when clicking outside
  document.addEventListener("click", (e) => {
    // Don't clear if clicking on galaxy
    if (!e.target.classList.contains('galaxy')) {
      clearAll();
    }
  });

  // Add click handlers for galaxies
  document.querySelectorAll(".galaxy").forEach(galaxy => {
    galaxy.addEventListener("click", (e) => {
      e.stopPropagation();
      const galaxyType = galaxy.classList.contains('spiral-1') ? 'andromeda' :
                       galaxy.classList.contains('spiral-2') ? 'whirlpool' : 'magellanic';
      showGalaxyInfo(galaxy, galaxyType);
    });
  });

  // Update lines on window resize
  window.addEventListener("resize", () => {
    const activeConstellation = document.querySelector(".constellation.active");
    if (activeConstellation) {
      updateLines(activeConstellation.id);
    }
  });
});

// Galaxy info function
function showGalaxyInfo(galaxy, galaxyType) {
  const galaxyInfo = document.getElementById("galaxy-info");
  const rect = galaxy.getBoundingClientRect();
  const mapRect = document.getElementById("constellation-map").getBoundingClientRect();
  
  const galaxyData = {
    andromeda: {
      name: "Andromeda Galaxy (M31)",
      distance: "📏 2.537 million light-years away",
      description: "Our cosmic neighbor and the most distant object visible to the naked eye!",
      facts: [
        "🚀 Racing toward us at 250,000 mph - we'll collide in 4.5 billion years!",
        "🌟 Contains over 1 TRILLION stars (our Milky Way has ~400 billion)",
        "👁️ Appears 6x wider than the full Moon in the sky, but too dim to see its full size",
        "🕳️ Houses a supermassive black hole 30x more massive than ours",
        "⚡ So bright that ancient astronomers thought it was a nebula in our own galaxy"
      ]
    },
    whirlpool: {
      name: "Whirlpool Galaxy (M51)",
      distance: "📏 23 million light-years away",
      description: "The galaxy that revealed spiral structure to humanity!",
      facts: [
        "🌪️ First galaxy where spiral arms were discovered (1845)",
        "👥 Actually TWO galaxies! The smaller yellow one is being devoured",
        "⭐ Star formation rate: 3 new stars born every year",
        "🔭 Perfect 'face-on' view makes it a photographer's dream",
        "💫 Its spiral arms are 'density waves' - like traffic jams in space!"
      ]
    },
    magellanic: {
      name: "Large Magellanic Cloud",
      distance: "📏 160,000 light-years away",
      description: "Our galaxy's loyal companion and stellar nursery!",
      facts: [
        "🌟 Visible to naked eye from Southern Hemisphere - looks like a cloud",
        "💥 Witnessed the closest supernova in 400 years (1987A)",
        "🏭 One of the most active star-forming regions in our local group",
        "🕰️ Orbits our Milky Way every 1.5 billion years",
        "🌈 Contains the Tarantula Nebula - so bright it would cast shadows on Earth if nearby!"
      ]
    }
  };
  
  const data = galaxyData[galaxyType];
  let html = `
    <button class="close-btn" onclick="hideGalaxyInfo()">×</button>
    <h4>${data.name}</h4>
    <div class="distance">${data.distance}</div>
    <p>${data.description}</p>
  `;
  
  data.facts.forEach(fact => {
    html += `<div class="fact">${fact}</div>`;
  });
  
  galaxyInfo.innerHTML = html;
  
  // Position the info panel
  let left = rect.right - mapRect.left + 15;
  let top = rect.top - mapRect.top;
  
  // Adjust if it goes off screen
  if (left + 320 > mapRect.width) {
    left = rect.left - mapRect.left - 335;
  }
  if (top + 200 > mapRect.height) {
    top = mapRect.height - 220;
  }
  
  galaxyInfo.style.left = left + "px";
  galaxyInfo.style.top = top + "px";
  galaxyInfo.classList.add("visible");
  
  // Auto-hide after 12 seconds (longer for more content)
  setTimeout(() => {
    galaxyInfo.classList.remove("visible");
  }, 12000);
}

function hideGalaxyInfo() {
  document.getElementById("galaxy-info").classList.remove("visible");
}

// Shooting star effect
function triggerShootingStar() {
  const shootingStar = document.getElementById("shooting-star");
  shootingStar.classList.remove("active");
  shootingStar.style.left = Math.random() * 200 + "px";
  shootingStar.style.top = Math.random() * 200 + "px";
  
  setTimeout(() => {
    shootingStar.classList.add("active");
  }, 100);
}

// Toggle nebulae visibility
function toggleNebulae() {
  const nebulae = document.querySelectorAll(".nebula");
  nebulae.forEach(nebula => {
    nebula.style.display = nebula.style.display === "none" ? "block" : "none";
  });
}

// Auto shooting star every 15 seconds
setInterval(triggerShootingStar, 15000);


function back2(){
  window.location.href = 'constellation.html';
}