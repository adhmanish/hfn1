document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                navLinks.style.zIndex = '1000';
            }
        });
    }
    
    // Destination Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationCards = document.querySelectorAll('.destination-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            destinationCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Packages Slider
    const packagesSlider = document.querySelector('.packages-slider');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const packageCards = document.querySelectorAll('.package-card');
    
    if (packagesSlider && prevBtn && nextBtn) {
        let cardWidth = 0;
        
        // Calculate card width including margin
        if (packageCards.length > 0) {
            const cardStyle = window.getComputedStyle(packageCards[0]);
            cardWidth = packageCards[0].offsetWidth + parseInt(cardStyle.marginRight);
        }
        
        nextBtn.addEventListener('click', function() {
            packagesSlider.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', function() {
            packagesSlider.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        });
    }
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentTestimonial = i;
                showTestimonial(currentTestimonial);
            });
        });
    }
    
    // Initialize testimonial slider
    showTestimonial(currentTestimonial);
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Form Validation and Submission
    const bookingForm = document.getElementById('bookingForm');
    const bookingPopup = document.querySelector('.booking-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const btnClosePopup = document.querySelector('.btn-close-popup');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Show success popup
                if (bookingPopup) {
                    bookingPopup.classList.add('active');
                    
                    // Reset form
                    bookingForm.reset();
                }
            }
        });
    }
    
    // Close popup
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            bookingPopup.classList.remove('active');
        });
    }
    
    if (btnClosePopup) {
        btnClosePopup.addEventListener('click', function() {
            bookingPopup.classList.remove('active');
        });
    }
    
    // Date validation for booking form
    const travelDateInput = document.getElementById('travelDate');
    if (travelDateInput) {
        // Set min date to today
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayString = yyyy + '-' + mm + '-' + dd;
        
        travelDateInput.setAttribute('min', todayString);
    }
    
    // Check-in and check-out date validation
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    
    if (checkInInput && checkOutInput) {
        // Set min date to today for check-in
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const todayString = yyyy + '-' + mm + '-' + dd;
        
        checkInInput.setAttribute('min', todayString);
        
        // Update min date for check-out when check-in changes
        checkInInput.addEventListener('change', function() {
            checkOutInput.setAttribute('min', this.value);
            
            // If check-out date is before new check-in date, reset it
            if (checkOutInput.value && checkOutInput.value < this.value) {
                checkOutInput.value = '';
            }
        });
    }
    
    // Smooth scroll for navigation links
    const navLinksList = document.querySelectorAll('.nav-links a');
    
    navLinksList.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth < 768 && navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim()) {
                // Show a simple alert for demo purposes
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-header, .destination-card, .package-card, .feature-card, .testimonial-card, .booking-container');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.section-header, .destination-card, .package-card, .feature-card, .testimonial-card, .booking-container');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call animation function on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Call once on page load
    animateOnScroll();
    
    // View More Destinations button
    const viewMoreBtn = document.querySelector('.btn-view-more');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // In a real application, this would load more destinations
            // For demo purposes, we'll just show an alert
            alert('In a real application, this would load more destinations from the server.');
        });
    }
    
    // Book Now buttons in package cards
    const bookNowBtns = document.querySelectorAll('.btn-book-now');
    
    bookNowBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Scroll to booking form
            const bookingSection = document.getElementById('contact');
            
            if (bookingSection) {
                window.scrollTo({
                    top: bookingSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Highlight the form briefly
                const bookingForm = document.getElementById('bookingForm');
                if (bookingForm) {
                    bookingForm.style.boxShadow = '0 0 20px rgba(13, 148, 136, 0.5)';
                    setTimeout(() => {
                        bookingForm.style.boxShadow = '';
                    }, 1500);
                }
                
                // Pre-select the package in the dropdown
                const packageSelect = document.getElementById('packageSelect');
                const packageName = this.closest('.package-card').querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
                
                if (packageSelect) {
                    for (let i = 0; i < packageSelect.options.length; i++) {
                        if (packageSelect.options[i].value === packageName) {
                            packageSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            }
        });
    });
    
    // View Details buttons in destination cards
    const viewDetailsBtns = document.querySelectorAll('.btn-details');
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would navigate to a destination detail page
            // For demo purposes, we'll just show an alert with the destination name
            const destinationName = this.closest('.destination-info').querySelector('h3').textContent;
            alert(`In a real application, this would navigate to a detailed page for ${destinationName}`);
        });
    });
});

