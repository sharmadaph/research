document.addEventListener('DOMContentLoaded', function() {
    const breakfastBtn = document.getElementById('breakfast-btn');
    const lunchBtn = document.getElementById('lunch-btn');
    const dinnerBtn = document.getElementById('dinner-btn');

    const breakfastSection = document.getElementById('breakfast');
    const lunchSection = document.getElementById('lunch');
    const dinnerSection = document.getElementById('dinner');

    function showSection(section) {
        // Hide all sections
        breakfastSection.style.display = 'none';
        lunchSection.style.display = 'none';
        dinnerSection.style.display = 'none';
        // Show the selected section
        section.style.display = 'block';
    }

    breakfastBtn.addEventListener('click', function() {
        showSection(breakfastSection);
    });

    lunchBtn.addEventListener('click', function() {
        showSection(lunchSection);
    });

    dinnerBtn.addEventListener('click', function() {
        showSection(dinnerSection);
    });

    // Optionally, show breakfast by default
    showSection(breakfastSection);
});