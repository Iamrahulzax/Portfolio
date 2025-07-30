document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Optional: Close mobile nav if applicable (you'd need to add a mobile nav toggle)
            // if (window.innerWidth <= 768) {
            //     // Logic to close mobile nav
            // }
        });
    });

    // Fade-in effect for sections on scroll
    const sections = document.querySelectorAll('section');

    const options = {
        threshold: 0.1 // Trigger when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add 'visible' class
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // You can add more JavaScript functionality here later
    // For example:
    // - A "scroll to top" button that appears after scrolling down
    // - Form validation (if you add a contact form)
    // - Dynamic content loading (e.g., fetching project data from an array)
});