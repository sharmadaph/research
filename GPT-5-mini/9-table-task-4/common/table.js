// Initializes click-to-select behavior for table cells.
// When a cell (`td` or `th`) is clicked, it receives the `selected` class
// and any other `selected` cell within the same table has the class removed.
export function initTableSelection(root = document) {
  root.addEventListener('click', (event) => {
    const cell = event.target.closest('td,th');
    if (!cell) return;
    const table = cell.closest('table');
    if (!table) return;
    const prev = table.querySelector('.selected');
    if (prev && prev !== cell) prev.classList.remove('selected');
    cell.classList.add('selected');
  });
}

export default initTableSelection;
