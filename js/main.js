function createStars(canvas,numStars,speed){
    const ctx = canvas.getContext("2d");
    let stars = [];

    // set the canvas size

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //create stars

    for(let i = 0; i < numStars;i++){
      
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2

      });
    }

    function drawStars(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "white"; 

      stars.forEach( star =>{
        
        ctx.beginPath();  
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill();

        // Move stars
        star.x -= speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      })
      requestAnimationFrame(drawStars);
    }
    drawStars();
}
  // 3 layers with different speeds
  createStars(document.getElementById("stars1"), 100, 0.2);
  createStars(document.getElementById("stars2"), 100, 0.5);
  createStars(document.getElementById("stars3"), 100, 1);
  
  // Update canvas size on resize
  window.addEventListener('resize', () => location.reload());
  

// Animate passport card on load
anime({
    targets: '.passport-card',
    translateY: [50, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutExpo'

  });
  
  // Animate button pulse
  anime({
    targets: '.start-btn',
    scale: [1, 1.1],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 1000
  });
  // Generate twinkle stars (HTML elements)
function createTwinkleStars(count = 50) {
  const container = document.querySelector('.twinkle-stars');
  for (let i = 0; i < count; i++) {
    
    const star = document.createElement('div');
    star.classList.add('twinkle-star');
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    container.appendChild(star);

    // Animate twinkling
    anime({
      targets: star,
      opacity: [0, 1],
      duration: 2000 + Math.random() * 2000,
      delay: Math.random() * 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });
  }
}

createTwinkleStars();

  
  // Go to next page on click
  document.querySelector('.start-btn').addEventListener('click', () => {
    window.location.href = 'space.html';
  });
  document.querySelector('#constellation').addEventListener('click', () => {
    window.location.href = 'const.html';
  });


  
  anime({
    targets: '.constellation-header h1, .constellation-header p',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(200),
    duration: 1200,
    easing: 'easeOutExpo'
  });

  // explore button 
  anime({
    targets: '.sector-card',
    opacity: [0, 1],
    translateY: [50, 0],
    delay: anime.stagger(200),
    duration: 1000,
    easing: 'easeOutExpo'
  });




  // adding own mission log
  

  
  
  