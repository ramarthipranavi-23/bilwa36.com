// Show popup when page loads
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('offerPopup');
    const closeBtn = document.querySelector('.close-popup');

    // Show popup after 2 seconds
    setTimeout(() => {
        popup.style.display = 'flex';
    }, 2000);

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the popup content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Usage Example:
// new Carousel({
//   images: ["img1.jpg", "img2.jpg"],
//   slidesContainer: document.getElementById('slides'),
//   indicatorsContainer: document.getElementById('indicators'),
//   prevBtn: document.getElementById('prevBtn'),
//   nextBtn: document.getElementById('nextBtn'),
//   imagesPerSlide: window.innerWidth <= 768 ? 1 : 2
// });

class Carousel {
    constructor({ images, slidesContainer, indicatorsContainer, prevBtn, nextBtn, imagesPerSlide }) {
        this.images = images;
        this.slidesContainer = slidesContainer;
        this.indicatorsContainer = indicatorsContainer;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.imagesPerSlide = imagesPerSlide || 2;
        this.totalSlides = Math.ceil(this.images.length / this.imagesPerSlide);
        this.currentSlideIndex = 0;
        this.init();
    }

    init() {
        this.createSlides();
        this.createIndicators();
        this.updateCarousel();
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        window.addEventListener('resize', () => this.rebuildCarousel());
    }

    createSlides() {
        this.slidesContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            const start = i * this.imagesPerSlide;
            const end = start + this.imagesPerSlide;
            const slideImages = this.images.slice(start, end);
            slideImages.forEach((src, idx) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = `Image ${start + idx + 1}`;
                slide.appendChild(img);
            });
            this.slidesContainer.appendChild(slide);
        }
    }

    updateCarousel() {
        this.slidesContainer.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;
        this.updateIndicators();
        this.updateButtons();
    }

    animatePageTurn(direction) {
        const slides = this.slidesContainer.querySelectorAll('.slide');
        const currentSlide = slides[this.currentSlideIndex];
        if (!currentSlide) return;
        const imgs = currentSlide.querySelectorAll('img');
        if (imgs.length < 2) return;
        if (direction === 'next') {
            imgs[1].classList.remove('page-turn', 'page-turn-reverse');
            void imgs[1].offsetWidth;
            imgs[1].classList.add('page-turn');
            imgs[1].addEventListener('animationend', function handler() {
                imgs[1].classList.remove('page-turn');
                imgs[1].removeEventListener('animationend', handler);
            });
        } else if (direction === 'prev') {
            imgs[0].classList.remove('page-turn', 'page-turn-reverse');
            void imgs[0].offsetWidth;
            imgs[0].classList.add('page-turn-reverse');
            imgs[0].addEventListener('animationend', function handler() {
                imgs[0].classList.remove('page-turn-reverse');
                imgs[0].removeEventListener('animationend', handler);
            });
        }
    }

    nextSlide() {
        if (this.currentSlideIndex < this.totalSlides - 1) {
            this.currentSlideIndex++;
            this.updateCarousel();
            this.animatePageTurn('next');
        }
    }

    prevSlide() {
        if (this.currentSlideIndex > 0) {
            this.currentSlideIndex--;
            this.updateCarousel();
            this.animatePageTurn('prev');
        }
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('indicator');
            dot.addEventListener('click', () => {
                this.currentSlideIndex = i;
                this.updateCarousel();
            });
            this.indicatorsContainer.appendChild(dot);
        }
        this.updateIndicators();
    }

    updateIndicators() {
        const dots = this.indicatorsContainer.querySelectorAll('.indicator');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlideIndex);
        });
    }

    updateButtons() {
        if (this.currentSlideIndex === 0) {
            this.prevBtn.style.display = 'none';
            this.nextBtn.style.display = '';
        } else if (this.currentSlideIndex === this.totalSlides - 1) {
            this.prevBtn.style.display = '';
            this.nextBtn.style.display = 'none';
        } else {
            this.prevBtn.style.display = '';
            this.nextBtn.style.display = '';
        }
    }

    rebuildCarousel() {
        this.imagesPerSlide = window.innerWidth <= 768 ? 1 : 2;
        this.totalSlides = Math.ceil(this.images.length / this.imagesPerSlide);
        if (this.currentSlideIndex >= this.totalSlides) this.currentSlideIndex = this.totalSlides - 1;
        this.createSlides();
        this.createIndicators();
        this.updateCarousel();
    }
}

// Initialize the carousel for the current menu page

document.addEventListener('DOMContentLoaded', function() {
    const images = [
        "bilwaa_menu_page_1.png",
        "bilwaa_menu_page_2.png",
        "bilwaa_menu_page_3.png",
        "bilwaa_menu_page_4.png",
        "bilwaa_menu_page_5.png",
        "bilwaa_menu_page_6.png",
        "bilwaa_menu_page_7.png",
        "bilwaa_menu_page_8.png",
        "bilwaa_menu_page_9.png",
        "bilwaa_menu_page_10.png",
        "bilwaa_menu_page_11.png",
        "bilwaa_menu_page_12.png",
    ];
    new Carousel({
        images,
        slidesContainer: document.getElementById('slides'),
        indicatorsContainer: document.getElementById('indicators'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        imagesPerSlide: window.innerWidth <= 768 ? 1 : 2
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const images = [
        "Thunderboltmenu-1.png",
        "Thunderboltmenu-2.png",
        "Thunderboltmenu-3.png",
        "Thunderboltmenu-4.png",
    ];
    new Carousel({
        images,
        slidesContainer: document.getElementById('slides-thunder'),
        indicatorsContainer: document.getElementById('indicators-thunder'),
        prevBtn: document.getElementById('prevBtn-thunder'),
        nextBtn: document.getElementById('nextBtn-thunder'),
        imagesPerSlide: window.innerWidth <= 768 ? 1 : 2
    });
});

// const images = [
//     "finalmenu.jpg",
//     "soups-1.jpg",
//     "starters-2.jpg",
//     "starter -continental.jpg",
//     "starters-asian.jpg",
//     "tandoori-4.jpg",
//     "sandwitch.jpg",
//     "pizza-6.jpg",
//     "maincourse-con7.jpg",
//     "maincourse-con8.jpg",
//     "maincourse-con9.jpg",
//     "maincourse-dimsum10.jpg",
//     "mincourse-ricepulao11.jpg",
//     "roti.jpg"
//   ];

//   const slidesContainer = document.getElementById('slides');
//   const indicatorsContainer = document.getElementById('indicators');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');

//   const imagesPerSlide = 2;
//   const totalSlides = Math.ceil(images.length / imagesPerSlide);
//   let currentSlideIndex = 0;

//   function createSlides() {
//     for (let i = 0; i < totalSlides; i++) {
//       const slide = document.createElement('div');
//       slide.className = 'slide';

//       const start = i * imagesPerSlide;
//       const end = start + imagesPerSlide;
//       const slideImages = images.slice(start, end);

//       slideImages.forEach((src, idx) => {
//         const img = document.createElement('img');
//         img.src = src;
//         img.alt = 'Image ${start + idx + 1}';
//         slide.appendChild(img);
//       });

//       slidesContainer.appendChild(slide);
//     }

//     updateCarousel();
//   }

//   function updateCarousel() {
//     slidesContainer.style.transform = 'translateX(-${currentSlideIndex * 100}%)';
//     updateIndicators();
//     updateButtons();
//   }

//   function nextSlide() {
//     if (currentSlideIndex < totalSlides - 1) {
//       currentSlideIndex++;
//       updateCarousel();
//     }
//   }

//   function prevSlide() {
//     if (currentSlideIndex > 0) {
//       currentSlideIndex--;
//       updateCarousel();
//     }
//   }

//   function createIndicators() {
//     for (let i = 0; i < totalSlides; i++) {
//       const dot = document.createElement('div');
//       dot.classList.add('indicator');
//       dot.addEventListener('click', () => {
//         currentSlideIndex = i;
//         updateCarousel();
//       });
//       indicatorsContainer.appendChild(dot);
//     }
//     updateIndicators();
//   }

//   function updateIndicators() {
//     const dots = document.querySelectorAll('.indicator');
//     dots.forEach((dot, index) => {
//       dot.classList.toggle('active', index === currentSlideIndex);
//     });
//   }

//   function updateButtons() {
//     prevBtn.disabled = currentSlideIndex === 0;
//     nextBtn.disabled = currentSlideIndex === totalSlides - 1;
//   }

//   createSlides();
//   createIndicators();
//   updateCarousel();

//   prevBtn.addEventListener('click', prevSlide);
//   nextBtn.addEventListener('click', nextSlide);