
document.addEventListener("DOMContentLoaded", () => {
const constellations = document.querySelectorAll(".constellation");
const infoPanel = document.getElementById("constellation-info");

// Detailed constellation data with real astronomical facts
const constellationData = {
  orion: {
    title: "Orion - The Hunter",
    distance: "500-2,000 light-years",
    description: "One of the most recognizable constellations, visible worldwide. Home to stellar nurseries and dying giants.",
    funFact: "Betelgeuse is so massive that if it replaced our Sun, its surface would extend beyond Mars' orbit! It's expected to explode as a supernova within 100,000 years.",
    stars: {
      "Betelgeuse": "Red supergiant, 1,400× Sun's diameter, semi-regular variable star",
      "Rigel": "Blue supergiant, 120,000× Sun's luminosity, actually a quadruple star system",
      "Alnitak": "Hot blue supergiant, part of Orion's Belt, illuminates the Flame Nebula",
      "Alnilam": "Blue supergiant, 375,000× Sun's luminosity, one of the most luminous stars known",
      "Mintaka": "Multiple star system, the westernmost star of Orion's Belt"
    },
    deepSky: "Contains the Orion Nebula (M42), Horse Head Nebula, and Flame Nebula - active star-forming regions"
  },
  pleiades: {
    title: "Pleiades - The Seven Sisters",
    distance: "444 light-years",
    description: "An open star cluster containing hot B-type stars formed from the same molecular cloud about 100 million years ago.",
    funFact: "Despite being called 'Seven Sisters,' the cluster contains over 1,000 stars! The blue reflection nebulae around them are created by dust grains reflecting starlight, not leftover material from their formation.",
    stars: {
      "Alcyone": "Blue giant, brightest star in the cluster, 2,400× Sun's luminosity",
      "Maia": "Blue giant, surrounded by bright nebulosity, variable star",
      "Electra": "Blue giant, one of the 'lost' Pleiades in mythology",
      "Taygeta": "Binary star system, eclipsing binary with 1.28-day period",
      "Asterope": "Double star, both components are blue-white main sequence stars",
      "Celaeno": "Blue giant, sometimes called the 'Lost Pleiad'",
      "Merope": "Hottest star in the cluster, surrounded by the Merope Nebula"
    },
    deepSky: "Embedded in reflection nebulae. Visible to naked eye, best viewed with binoculars"
  },
  scorpius: {
    title: "Scorpius - The Scorpion",
    distance: "65-700 light-years",
    description: "A zodiacal constellation that actually looks like its namesake. Contains the galactic center direction and many stellar treasures.",
    funFact: "Antares means 'rival of Mars' because of its red color and brightness. It's so large that 700 million Suns could fit inside it! If placed at the center of our solar system, it would engulf the orbits of Mercury, Venus, Earth, and Mars.",
    stars: {
      "Antares": "Red supergiant, 1.5 billion km diameter, companion white dwarf star",
      "Shaula": "Blue giant, 'the stinger' of the scorpion, multiple star system",
      "Sargas": "Orange giant, evolved star that has exhausted its hydrogen core",
      "Dschubba": "Blue giant, exhibits sudden brightening episodes",
      "Graffias": "Complex multiple star system with at least 5 components"
    },
    deepSky: "Near galactic center, rich in nebulae and star clusters including M4 and M80 globular clusters"
  },
  vega: {
    title: "Lyra - The Lyre (featuring Vega)",
    distance: "25 light-years (Vega)",
    description: "Small but prominent constellation containing Vega, one of the brightest stars in our sky and former northern pole star.",
    funFact: "Vega was the northern pole star around 12,000 BCE and will be again around 13,727 CE due to Earth's axial precession! It was the first star ever photographed (1850) and the first to have its spectrum recorded.",
    stars: {
      "Vega": "White main sequence star, standard for stellar brightness scale (magnitude 0)",
      "Sheliak": "Eclipsing binary, prototype of Beta Lyrae variables, orbital period 12.9 days",
      "Sulafat": "Blue giant, part of the Summer Triangle asterism with Vega and Altair"
    },
    deepSky: "Contains the Ring Nebula (M57), a famous planetary nebula formed by a dying star"
  },
  andromeda: {
    title: "Andromeda - The Chained Princess",
    distance: "97-390 light-years",
    description: "Named after the mythological princess, this constellation points the way to our nearest galactic neighbor.",
    funFact: "The Andromeda Galaxy (M31) is visible to the naked eye as a fuzzy patch and is approaching the Milky Way at 250,000 mph! In 4.5 billion years, it will collide with our galaxy, creating 'Milkomeda.'",
    stars: {
      "Alpheratz": "Blue subgiant, shared with Pegasus, unusually rich in mercury and manganese",
      "Mirach": "Red giant, irregular variable star, brightness varies over months",
      "Almach": "Quadruple star system, beautiful color contrast in telescopes",
      "Sadiradra": "Orange giant, part of the 'Square of Pegasus' asterism"
    },
    deepSky: "Contains the Andromeda Galaxy (M31), closest major galaxy at 2.5 million light-years away"
  }
};

// Get star center position
function getStarCenter(star) {
  const rect = star.getBoundingClientRect();
  const mapRect = document.getElementById("constellation-map").getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - mapRect.left,
    y: rect.top + rect.height / 2 - mapRect.top
  };
}

// Clear all selections
function clearAll() {
  constellations.forEach(constellation => {
    constellation.classList.remove("active");
    const stars = constellation.querySelectorAll(".star");
    stars.forEach(star => star.classList.remove("selected"));
  });
  
  document.querySelectorAll(".constellation-line").forEach(line => {
    line.classList.remove("visible");
  });
  
  infoPanel.classList.remove("visible");
  infoPanel.innerHTML = "";
}

// Update lines for constellations
function updateLines(constellationId) {
  const constellation = document.getElementById(constellationId);
  const stars = constellation.querySelectorAll(".star");
  
  if (constellationId === "orion" && stars.length >= 6) {
    const positions = Array.from(stars).map(star => getStarCenter(star));
    const lines = [
      document.getElementById("orion-line1"),
      document.getElementById("orion-line2"),
      document.getElementById("orion-line3"),
      document.getElementById("orion-line4"),
      document.getElementById("orion-line5")
    ];
    
    // Orion's main shape
    setLine(lines[0], positions[0], positions[2]); // Betelgeuse to belt
    setLine(lines[1], positions[2], positions[3]); // Belt stars
    setLine(lines[2], positions[3], positions[4]); // Belt stars
    setLine(lines[3], positions[1], positions[5]); // Rigel to Saiph
    setLine(lines[4], positions[0], positions[1]); // Betelgeuse to Rigel
    
    lines.forEach(line => line.classList.add("visible"));
  }
  
  if (constellationId === "pleiades" && stars.length >= 7) {
    const positions = Array.from(stars).map(star => getStarCenter(star));
    const lines = [
      document.getElementById("pleiades-line1"),
      document.getElementById("pleiades-line2"),
      document.getElementById("pleiades-line3"),
      document.getElementById("pleiades-line4"),
      document.getElementById("pleiades-line5"),
      document.getElementById("pleiades-line6")
    ];
    
    // Connect the Seven Sisters
    setLine(lines[0], positions[0], positions[1]);
    setLine(lines[1], positions[0], positions[2]);
    setLine(lines[2], positions[0], positions[3]);
    setLine(lines[3], positions[1], positions[4]);
    setLine(lines[4], positions[2], positions[5]);
    setLine(lines[5], positions[5], positions[6]);
    
    lines.forEach(line => line.classList.add("visible"));
  }
  
  if (constellationId === "scorpius" && stars.length >= 5) {
    const positions = Array.from(stars).map(star => getStarCenter(star));
    const lines = [
      document.getElementById("scorpius-line1"),
      document.getElementById("scorpius-line2"),
      document.getElementById("scorpius-line3"),
      document.getElementById("scorpius-line4"),
      document.getElementById("scorpius-line5")
    ];
    
    // Scorpion shape
    setLine(lines[0], positions[4], positions[3]); // Head
    setLine(lines[1], positions[3], positions[0]); // To heart (Antares)
    setLine(lines[2], positions[0], positions[2]); // Body
    setLine(lines[3], positions[2], positions[1]); // Tail
    setLine(lines[4], positions[0], positions[1]); // Alternative path
    
    lines.forEach(line => line.classList.add("visible"));
  }
  
  if (constellationId === "vega" && stars.length >= 3) {
    const positions = Array.from(stars).map(star => getStarCenter(star));
    const lines = [
      document.getElementById("vega-line1"),
      document.getElementById("vega-line2"),
      document.getElementById("vega-line3")
    ];
    
    // Lyre shape
    setLine(lines[0], positions[0], positions[1]);
    setLine(lines[1], positions[0], positions[2]);
    setLine(lines[2], positions[1], positions[2]);
    
    lines.forEach(line => line.classList.add("visible"));
  }
  
  if (constellationId === "andromeda" && stars.length >= 4) {
    const positions = Array.from(stars).map(star => getStarCenter(star));
    const lines = [
      document.getElementById("andromeda-line1"),
      document.getElementById("andromeda-line2"),
      document.getElementById("andromeda-line3"),
      document.getElementById("andromeda-line4")
    ];
    
    // Andromeda chain
    setLine(lines[0], positions[0], positions[3]);
    setLine(lines[1], positions[0], positions[1]);
    setLine(lines[2], positions[1], positions[2]);
    setLine(lines[3], positions[0], positions[2]);
    
    lines.forEach(line => line.classList.add("visible"));
  }
}

function setLine(line, pos1, pos2) {
  line.setAttribute("x1", pos1.x);
  line.setAttribute("y1", pos1.y);
  line.setAttribute("x2", pos2.x);
  line.setAttribute("y2", pos2.y);
}

// Show constellation info
function showInfo(constellationId) {
  const data = constellationData[constellationId];
  if (data) {
    let html = `
      <h3>${data.title}</h3>
      <p><span class="distance">Distance: ${data.distance}</span></p>
      <p>${data.description}</p>
      <div class="fun-fact">
        <strong>🌟 Amazing Fact:</strong><br>
        ${data.funFact}
      </div>
      <div class="stars-list">
        <strong>Notable Stars:</strong>
    `;
    
    Object.entries(data.stars).forEach(([name, info]) => {
      html += `<div class="star-detail"><strong>${name}:</strong> ${info}</div>`;
    });
    
    html += `</div><p><strong>Deep Sky Objects:</strong> ${data.deepSky}</p>`;
    
    infoPanel.innerHTML = html;
    infoPanel.classList.add("visible");
  }
}

// Event handlers
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

// Individual star click handlers
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
  
  // Touch event for mobile
  star.addEventListener("touchstart", (e) => {
    e.preventDefault();
    star.click();
  });
});

// Clear selection when clicking outside
document.addEventListener("click", () => {
  clearAll();
});

// Update lines on window resize
window.addEventListener("resize", () => {
  const activeConstellation = document.querySelector(".constellation.active");
  if (activeConstellation) {
    setTimeout(() => updateLines(activeConstellation.id), 100);
  }
});

// Global functions for buttons
window.clearAll = clearAll;

window.showRandomConstellation = function() {
  const constellationIds = ['orion', 'pleiades', 'scorpius', 'vega', 'andromeda'];
  const randomId = constellationIds[Math.floor(Math.random() * constellationIds.length)];
  const constellation = document.getElementById(randomId);
  
  clearAll();
  constellation.classList.add("active");
  constellation.querySelectorAll(".star").forEach(star => star.classList.add("selected"));
  updateLines(randomId);
  showInfo(randomId);
};

window.showAllConstellations = function() {
  clearAll();
  constellations.forEach(constellation => {
    constellation.classList.add("active");
    constellation.querySelectorAll(".star").forEach(star => star.classList.add("selected"));
    updateLines(constellation.id);
  });
  
  // Show a summary info panel
  infoPanel.innerHTML = `
    <h3>🌌 All Constellations Active</h3>
    <p>You're viewing ${constellations.length} magnificent stellar formations!</p>
    <div class="fun-fact">
      <strong>Did you know?</strong><br>
      The stars you see represent different stages of stellar evolution - from young hot blue giants to ancient red supergiants nearing the end of their lives.
    </div>
    <p>Click on any constellation or star for detailed information!</p>
  `;
  infoPanel.classList.add("visible");
};

// Initialize with a welcome message
setTimeout(() => {
  infoPanel.innerHTML = `
    <h3>🌟 Welcome to the Cosmos!</h3>
    <p>Click on any constellation or star to explore fascinating astronomical facts!</p>
    <div class="fun-fact">
      <strong>Pro Tip:</strong><br>
      Look for the twinkling variable stars and colorful binary systems. Each star tells a unique story of cosmic evolution.
    </div>
    <p>Perfect for astronomy enthusiasts! 🔭✨</p>
  `;
  infoPanel.classList.add("visible");
}, 1000);

// Auto-hide welcome message after 5 seconds
setTimeout(() => {
  if (infoPanel.innerHTML.includes("Welcome to the Cosmos")) {
    infoPanel.classList.remove("visible");
  }
}, 6000);
});

function back(){
  window.location.href = 'constellation.html';
}