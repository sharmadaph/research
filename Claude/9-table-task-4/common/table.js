/**
 * Table cell selection functionality
 * Handles clicking on cells to select/highlight them with 'selected' class
 */

class TableCellSelector {
  constructor(tableSelector = 'table') {
    this.table = document.querySelector(tableSelector);
    this.selectedCell = null;
    this.init();
  }

  init() {
    if (!this.table) {
      console.error('Table element not found');
      return;
    }

    // Add click event listener to all cells
    this.table.addEventListener('click', (e) => this.handleCellClick(e));
  }

  handleCellClick(event) {
    const cell = event.target.closest('td, th');
    
    if (!cell) return;

    // Remove 'selected' class from previously selected cell
    if (this.selectedCell) {
      this.selectedCell.classList.remove('selected');
    }

    // Add 'selected' class to clicked cell
    cell.classList.add('selected');
    this.selectedCell = cell;
  }

  getSelectedCell() {
    return this.selectedCell;
  }

  clearSelection() {
    if (this.selectedCell) {
      this.selectedCell.classList.remove('selected');
      this.selectedCell = null;
    }
  }
}

export default TableCellSelector;
