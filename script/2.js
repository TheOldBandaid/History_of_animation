class CircularCardSlider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.wrapper = this.container.querySelector('.swiper-wrapper');
        this.slides = Array.from(this.wrapper.querySelectorAll('.swiper-slide'));
        this.currentIndex = 0;
        this.isAnimating = false;
        this.radius = 350;
        this.angleStep = 360 / this.slides.length; 
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        
        this.init();
        this.createNavigation();
        this.attachEventListeners();
    }
    
    init() {
        this.updateSlidesPosition();
        this.updateSlidesStyle();
        // this.startAutoPlay();
    }
    
    updateSlidesPosition() {
        const centerX = this.container.offsetWidth / 2;
        const centerY = this.container.offsetHeight / 2;
        
        this.slides.forEach((slide, index) => {
            const angle = ((index - this.currentIndex) * this.angleStep - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * this.radius;
            const z = -Math.sin(angle) * this.radius;
            
            slide._targetX = x;
            slide._targetZ = z;
            
            const distance = Math.min(
                Math.abs(index - this.currentIndex),
                this.totalSlides - Math.abs(index - this.currentIndex)
            );

            slide._opacity = 1; 

            slide._scale = Math.max(0.7, 1 - distance * 0.2); 
            slide._zIndex = this.totalSlides - distance;
            
            const angleDeg = ((index - this.currentIndex) * this.angleStep - 90);
            const normalizedAngle = ((angleDeg % 360) + 360) % 360;
            
            if (normalizedAngle > 90 && normalizedAngle < 270) {
                slide._showBack = true;
            } else {
                slide._showBack = false;
            }
        });
    }
    
    updateSlidesStyle() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `
                translate3d(${slide._targetX}px, 0, ${slide._targetZ}px)
                scale(${slide._scale})
            `;
            
            slide.style.opacity = slide._opacity;
            slide.style.zIndex = slide._zIndex;
            slide.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            if (slide._showBack) {
                slide.classList.add('_showBack');
            } else {
                slide.classList.remove('_showBack');
            }
            
            const front = slide.querySelector('.cards-stack-front');
            const back = slide.querySelector('.cards-stack-back');
            
            if (front && back) {
                front.style.opacity = slide._showBack ? '0' : '1';
                front.style.transform = slide._showBack ? 'rotateY(180deg)' : 'rotateY(0deg)';
                back.style.opacity = slide._showBack ? '1' : '0';
                back.style.transform = slide._showBack ? 'rotateY(0deg)' : 'rotateY(-180deg)';
                
                front.style.transition = 'opacity 0.4s ease, transform 0.8s ease';
                back.style.transition = 'opacity 0.4s ease, transform 0.8s ease';
            }
            
            if (index === this.currentIndex) {
                slide.style.filter = 'brightness(1.2)';
                slide.style.boxShadow = '0 25px 50px rgba(255, 107, 53, 0.5)';
            } else {
                slide.style.filter = 'brightness(0.8)';
                slide.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            }
        });
    }
    
    slideTo(index) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.stopAutoPlay();
        
        if (index < 0) index = this.totalSlides - 1;
        if (index >= this.totalSlides) index = 0;
        
        this.currentIndex = index;
        this.updateSlidesPosition();
        this.updateSlidesStyle();
        
        setTimeout(() => {
            this.isAnimating = false;
            // this.startAutoPlay();
        }, 800);
    }
    
    slideNext() {
        this.slideTo(this.currentIndex - 1);
    }
    
    slidePrev() {
        this.slideTo(this.currentIndex + 1);
    }
    
    createNavigation() {
        const oldButtons = this.container.querySelectorAll('.slider-nav-btn');
        oldButtons.forEach(btn => btn.remove());
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-nav-btn slider-nav-prev';
        prevBtn.innerHTML = '❮';
        prevBtn.setAttribute('aria-label', 'Предыдущий слайд');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-nav-btn slider-nav-next';
        nextBtn.innerHTML = '❯';
        nextBtn.setAttribute('aria-label', 'Следующий слайд');
        
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.slidePrev();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.slideNext();
        });
    }
    
    attachEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.slidePrev();
            } else if (e.key === 'ArrowRight') {
                this.slideNext();
            }
        });
        
        // this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        // this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        this.slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.slideTo(index);
                }
            });
        });
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.slideNext();
        }, 4000);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    onResize() {
        const width = this.container.offsetWidth;
        this.radius = Math.min(width * 0.35, 250); 
        this.updateSlidesPosition();
        this.updateSlidesStyle();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const slider = new CircularCardSlider('.demo-slider-container');
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            slider.onResize();
        }, 250);
    });
    
    window.circularSlider = slider;
});