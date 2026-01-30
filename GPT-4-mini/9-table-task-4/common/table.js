// Function to add 'selected' class to a clicked cell
function highlightCellOnClick() {
    // Add event listener to the table
    document.addEventListener('click', function(event) {
        const target = event.target;

        // Check if the clicked element is a table cell
        if (target.tagName === 'TD') {
            // Remove 'selected' class from all cells
            const allCells = document.querySelectorAll('td');
            allCells.forEach(cell => cell.classList.remove('selected'));

            // Add 'selected' class to the clicked cell
            target.classList.add('selected');
        }
    });
}

// Export the function
export { highlightCellOnClick };