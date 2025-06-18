// CVjules.js - Zoom sur les sections et photo avec flou
document.addEventListener("DOMContentLoaded", function() {
    // Créer les éléments du zoom
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'zoom-overlay';
    
    const zoomContent = document.createElement('div');
    zoomContent.className = 'zoom-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'zoom-close-btn';
    closeBtn.innerHTML = '&times; Fermer';
    
    zoomOverlay.appendChild(zoomContent);
    zoomOverlay.appendChild(closeBtn);
    document.body.appendChild(zoomOverlay);
    
    // Ajouter le CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = `
        .zoom-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(5px);
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }
        
        .zoom-overlay.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .zoom-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.95);
            transition: transform 0.3s ease;
            border: 2px solid #6e8efb;
            position: relative;
        }
        
        .zoom-overlay.active .zoom-content {
            transform: scale(1);
        }
        
        .zoom-close-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #6e8efb;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            z-index: 1001;
            transition: all 0.3s;
        }
        
        .zoom-close-btn:hover {
            background: #a777e3;
            transform: scale(1.05);
        }
        
        .zoomable {
            cursor: pointer;
            transition: transform 0.2s;
        }
        
        .zoomable:hover {
            transform: scale(1.02);
        }
        
        body.zoom-mode {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Fonction pour activer le zoom
    function activateZoom(content) {
        document.body.classList.add('zoom-mode');
        zoomContent.innerHTML = '';
        
        // Si c'est une image, créer une version agrandie
        if (content.tagName === 'IMG') {
            const imgClone = content.cloneNode();
            imgClone.style.maxWidth = '100%';
            imgClone.style.maxHeight = '70vh';
            imgClone.style.display = 'block';
            imgClone.style.margin = '0 auto';
            zoomContent.appendChild(imgClone);
        } 
        // Sinon cloner le contenu de la section
        else {
            const sectionClone = content.cloneNode(true);
            zoomContent.appendChild(sectionClone);
        }
        
        zoomOverlay.classList.add('active');
    }
    
    // Fonction pour fermer le zoom
    function closeZoom() {
        zoomOverlay.classList.remove('active');
        setTimeout(() => {
            document.body.classList.remove('zoom-mode');
        }, 300);
    }
    
    // Ajouter les événements aux sections zoomables
    const zoomableSections = document.querySelectorAll('section, .infos img');
    zoomableSections.forEach(section => {
        section.classList.add('zoomable');
        
        section.addEventListener('click', function(e) {
            // Ne pas zoomer si on clique sur un lien
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            activateZoom(this);
        });
    });
    
    // Bouton de fermeture
    closeBtn.addEventListener('click', closeZoom);
    
    // Fermer en cliquant en dehors du contenu
    zoomOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeZoom();
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
            closeZoom();
        }
    });
});