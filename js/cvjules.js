document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('btn');
    const body = document.body;
    
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        btn.disabled = true;
        
        // Style de désactivation du bouton
        btn.style.transform = 'scale(0.95)';
        btn.style.opacity = '0.8';
        
        // Coordonnées du centre du bouton
        const btnRect = btn.getBoundingClientRect();
        const centerX = btnRect.left + btnRect.width/2;
        const centerY = btnRect.top + btnRect.height/2;
        
        // Paramètres des fissures
        const mainCracks = 8;       // Nombre de fissures principales
        const subCracks = 3;        // Branches par fissure principale
        const fragments = 300;      // Nombre total de fragments
        
        // Créer des fissures principales
        for (let i = 0; i < mainCracks; i++) {
            const mainAngle = (i * (2 * Math.PI / mainCracks));
            const crackLength = Math.max(window.innerWidth, window.innerHeight) * 0.8;
            
            // Dessiner la ligne de fissure principale
            drawCrackLine(centerX, centerY, mainAngle, crackLength, 3, 'rgba(0,0,0,0.5)');
            
            // Créer des fragments le long de la fissure
            createFragmentsAlongCrack(centerX, centerY, mainAngle, crackLength, fragments/mainCracks);
            
            // Créer des fissures secondaires
            for (let j = 1; j <= subCracks; j++) {
                const subAngle = mainAngle + (Math.random() - 0.5) * Math.PI/2;
                const subLength = crackLength * (0.3 + Math.random() * 0.4);
                const startAt = crackLength * (0.2 + Math.random() * 0.5);
                
                drawCrackLine(
                    centerX + Math.cos(mainAngle) * startAt,
                    centerY + Math.sin(mainAngle) * startAt,
                    subAngle,
                    subLength,
                    2,
                    'rgba(0,0,0,0.4)'
                );
                
                createFragmentsAlongCrack(
                    centerX + Math.cos(mainAngle) * startAt,
                    centerY + Math.sin(mainAngle) * startAt,
                    subAngle,
                    subLength,
                    fragments/(mainCracks*subCracks)
                );
            }
        }
        
        // Fonction pour dessiner une ligne de fissure visible
        function drawCrackLine(startX, startY, angle, length, width, color) {
            const line = document.createElement('div');
            line.className = 'crack-line';
            
            line.style.width = `${length}px`;
            line.style.height = `${width}px`;
            line.style.left = `${startX}px`;
            line.style.top = `${startY}px`;
            line.style.transform = `rotate(${angle}rad)`;
            line.style.background = color;
            line.style.opacity = '0';
            
            document.body.appendChild(line);
            
            // Animation d'apparition
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transition = 'opacity 0.3s ease-out';
            }, 50);
        }
        
        // Fonction pour créer des fragments le long d'une fissure
        function createFragmentsAlongCrack(startX, startY, angle, length, count) {
            for (let i = 0; i < count; i++) {
                const distance = (i/count) * length;
                const x = startX + Math.cos(angle) * distance;
                const y = startY + Math.sin(angle) * distance;
                
                createFragment(x, y, angle, distance);
            }
        }
        
        // Fonction pour créer un fragment visible
        function createFragment(x, y, angle, distance) {
            const fragment = document.createElement('div');
            fragment.className = 'crack-piece';
            
            // Taille et forme variables
            const size = 10 + Math.random() * 25;
            fragment.style.width = `${size}px`;
            fragment.style.height = `${size}px`;
            
            // Position initiale
            fragment.style.left = `${x}px`;
            fragment.style.top = `${y}px`;
            
            // Style visuel
            fragment.style.background = `hsl(${Math.random() * 60 + 200}, 70%, ${70 + Math.random() * 20}%)`;
            fragment.style.borderRadius = Math.random() > 0.7 ? '50%' : '3px';
            fragment.style.opacity = '0';
            
            document.body.appendChild(fragment);
            
            // Animation avec délai progressif
            setTimeout(() => {
                const flyDistance = 50 + Math.random() * 150;
                const flyAngle = angle + (Math.random() - 0.5) * Math.PI/2;
                const flyX = x + Math.cos(flyAngle) * flyDistance;
                const flyY = y + Math.sin(flyAngle) * flyDistance;
                
                fragment.style.transform = `translate(${flyX-x}px, ${flyY-y}px) rotate(${Math.random() * 360}deg)`;
                fragment.style.opacity = '0.8';
                fragment.style.transition = `all ${0.5 + Math.random()}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
            }, distance * 1.5);
        }
        
        // Redirection après animation
        setTimeout(() => {
            window.location.href = 'CVjules.html';
        }, 1800);
    });
});