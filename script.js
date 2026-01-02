gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded",function(){
    setForm();
    setupSwipers();
    setUpAnimations();
    document.body.style.opacity = 1;
})

function setUpAnimations() {
    const topFlower = document.querySelector(".floral-decoration.top");
    const leftFlower = document.querySelector(".floral-decoration.top-left");
    const rightFlower = document.querySelector(".floral-decoration.top-right");
    const couplesNames = document.querySelector(".couple-names");
    const hero_tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",      // The element that triggers the animation
            start: "top 75%",     // When the top of the box hits 80% of the viewport height
            end: "center 75%",       // When the top of the box hits 30% of the viewport height
            scrub: false,          // Links the animation to the scrollbar (scroll back and forth)
            markers: false         // Adds visual markers for debugging (remove for production)
        },
    })
    hero_tl.fromTo(topFlower, 
        {
            y:200,
            x:-100
        },
        {
            y:0,
            x:0,
            duration:1.25,
            ease:'power1.out'
        }, 0
    );
    hero_tl.fromTo(leftFlower, 
        {
            x:-100
        },
        {
            x:0,
            duration:0.75,
            ease:'power1.out'
        }, 0.25
    );
    hero_tl.fromTo(rightFlower, 
        {
            x:100
        },
        {
            x:0,
            duration:0.75,
            ease:'power1.out'
        }, 0.25
    );
    hero_tl.fromTo(couplesNames.querySelectorAll('span'), 
        {
            y:50,
            opacity:0,
        },
        {
            y:0,
            opacity:1,
            duration:1,
            stagger: 0.07
        }, 0.25
    );
    hero_tl.fromTo(document.querySelector(".hero .cta-button"),
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 0.25,
            ease:'none'
        }, 1.5)
    hero_tl.duration(2);



    // suki
    if(window.innerWidth > 768) {
        const suki = document.querySelector(".image-decoration.suki");
        const footer_tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".contact",      // The element that triggers the animation
                start: "center-=100 75%",     // When the top of the box hits 80% of the viewport height
                end: "center+=100 75%",       // When the top of the box hits 30% of the viewport height
                scrub: true,          // Links the animation to the scrollbar (scroll back and forth)
                markers: false         // Adds visual markers for debugging (remove for production)
            },
        });
        footer_tl.fromTo(suki, 
            {
                y:100
            },{
                y:0,
                duration:0.55
            }, 0
        )
    } else {
        const sukiMobile = document.querySelector(".image-decoration.center .suki");
        const footer_tl_mobile = gsap.timeline({
            scrollTrigger: {
                trigger: ".contact",      // The element that triggers the animation
                start: "bottom-=50 100%",     // When the top of the box hits 80% of the viewport height
                end: "bottom 100%",       // When the top of the box hits 30% of the viewport height
                scrub: true,          // Links the animation to the scrollbar (scroll back and forth)
                markers: false         // Adds visual markers for debugging (remove for production)
            },
        });
        footer_tl_mobile.fromTo(sukiMobile, 
            {
                y:150,
                x:50
            },{
                y:0,
                x:0,
                duration:0.55
            }, 0
        )
    }

}

function setForm() {
    const dialog = document.getElementById('formModal');
    const openBtn = document.querySelectorAll('.cta-button');
    const closeBtn = document.getElementById('closeBtn');
    const form = document.getElementById('rsvpForm');
    const guestsInput = document.getElementById('guests');
    const guestNamesGroup = document.getElementById('guestsNameGroup');
    const attendingYes = document.getElementById('attending-yes');
    const attendingNo = document.getElementById('attending-no');
    
    // Open dialog
    openBtn.forEach(button =>{
        button.addEventListener('click', () => {
            dialog.showModal();
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    })
    
    // Close dialog
    closeBtn.addEventListener('click', () => {
        dialog.close();
        document.body.style.overflow = ''; // Restore background scrolling
    });

    // Close dialog when clicking outside (on backdrop)
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            dialog.close();
        }
    });
    

    guestsInput.addEventListener('input', () => {
        const guestCount = parseInt(guestsInput.value) || 0;
        const shouldShow = guestCount > 0;

        gsap.to(guestNamesGroup, {
            height: shouldShow ? "auto" : 0,
            opacity: shouldShow ? 1 : 0,
            duration: 0.5,
            ease: "power2.inOut",
            overwrite: true // Prevents animation glitches if the user types fast
        });
    });

    // At the top of your script
    const modalCanvas = document.getElementById('modal-confetti');
    const myConfetti = confetti.create(modalCanvas, {
        resize: true, // Automatically scales to the modal size
        useWorker: true
    });

    // Inside your event listener
    attendingYes.addEventListener('change', (e) => {
        if (e.target.checked) {
            myConfetti({
                particleCount: 350,
                spread: 500,
                origin: { y: 0.2 }
            });
        }
    });
    attendingNo.addEventListener('change', (e) => {
    if (e.target.checked) {
        // Use the same canvas instance or the global confetti
        myConfetti({
            particleCount: 20,
            spread: 50,
            origin: { y: 0.5 },
            shapes: [
                confetti.shapeFromText({ text: '☹️' }),
                confetti.shapeFromText({ text: '💩' })
            ],
            scalar: 3,
            ticks:150
        });
    }
});
}

function setupSwipers() {
    if(window.innerWidth < 768) {
        const heroSwiper = new Swiper(".heroSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        loop: false,
        });
    }


    const swiper = new Swiper('.mySwiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        allowTouchMove: false
    });

    // Get all list items
    const listItems = document.querySelectorAll('.accommodations-text li');

    // Add hover event listeners
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const slideIndex = parseInt(item.getAttribute('data-slide'));
            swiper.slideTo(slideIndex);
        });
    });

    const swiperTravel = new Swiper('.travelSwiper', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        allowTouchMove: false
    });

    // Get all list items
    const travelItems = document.querySelectorAll('.travel [data-slide]');

    // Add hover event listeners
    travelItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const slideIndex = parseInt(item.getAttribute('data-slide'));
            swiperTravel.slideTo(slideIndex);
        });
    });
}

function fireCannons() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
        });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
}

function addToCalendar() {
    const event = {
        title: "Abby & Baily's Wedding",
        location: "Historical Poole Forge, https://historicpooleforge.org/",
        description: "Abby & Baily's Wedding at Historical Poole Forge",
        start: new Date("2026-07-11T14:00:00"),
        end: new Date("2026-07-11T18:00:00"), // Assuming 4-hour event
        url: "https://historicpooleforge.org/"
    };

    // Format dates for .ics file (YYYYMMDDTHHmmss)
    const formatDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    // Create .ics file content
    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Wedding Calendar//EN',
        'BEGIN:VEVENT',
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:${event.location}`,
        `URL:${event.url}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    // Create blob and download
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'abby-baily-wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}