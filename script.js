// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // 1) Animación de aparición con IntersectionObserver (mejor que scroll)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Evita reprocesar
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.15 }
  );

  document.querySelectorAll('.producto').forEach((el) => observer.observe(el));

  // 2) Scroll suave para los enlaces del menú
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 3) Efecto táctil en imágenes (para móvil): simula hover al tocar
  const imgs = document.querySelectorAll('.producto img');
  imgs.forEach((img) => {
    // En móvil, al tocar hace zoom breve
    img.addEventListener('touchstart', () => {
      img.style.transform = 'scale(1.05)';
    });
    img.addEventListener('touchend', () => {
      // Quita el zoom tras un pequeño delay para que se note
      setTimeout(() => {
        img.style.transform = '';
      }, 150);
    });
  });

  // 4) Botón "volver arriba" opcional (se crea dinámicamente)
  const backTop = document.createElement('button');
  backTop.textContent = '↑ Arriba';
  backTop.setAttribute('aria-label', 'Volver arriba');
  backTop.style.position = 'fixed';
  backTop.style.right = '16px';
  backTop.style.bottom = '16px';
  backTop.style.padding = '10px 12px';
  backTop.style.border = 'none';
  backTop.style.borderRadius = '8px';
  backTop.style.background = '#b30059';
  backTop.style.color = '#fff';
  backTop.style.fontWeight = 'bold';
  backTop.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  backTop.style.cursor = 'pointer';
  backTop.style.opacity = '0';
  backTop.style.transform = 'translateY(20px)';
  backTop.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  backTop.style.zIndex = '999';
  document.body.appendChild(backTop);

  const toggleBackTop = () => {
    if (window.scrollY > 300) {
      backTop.style.opacity = '1';
      backTop.style.transform = 'translateY(0)';
    } else {
      backTop.style.opacity = '0';
      backTop.style.transform = 'translateY(20px)';
    }
  };
  toggleBackTop();
  window.addEventListener('scroll', toggleBackTop);

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 5) Mejora accesible: enfoque visible en tarjetas con teclado
  const productos = document.querySelectorAll('.producto');
  productos.forEach((card) => {
    card.setAttribute('tabindex', '0'); // Permite focus con teclado
    card.addEventListener('focus', () => {
      card.style.boxShadow = '0 0 0 3px rgba(179,0,89,0.3)';
    });
    card.addEventListener('blur', () => {
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    });
  });

  // 6) Mini toque: animación al hacer click en el botón de WhatsApp
  const waBtn = document.querySelector('.whatsapp');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      waBtn.style.transform = 'scale(0.97)';
      setTimeout(() => (waBtn.style.transform = ''), 120);
    });
  }
});
