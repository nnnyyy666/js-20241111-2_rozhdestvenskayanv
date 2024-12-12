export default class SortableTable {
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.config = headerConfig;
    this.data = data;

    this.element = this.createTable(this.template());
    this.selectSubElements();
    this.addEventListeners();
  }

  selectSubElements() {
    this.element.querySelectorAll("[data-element]").forEach((element) => {
      this.subElements[element.dataset.element] = element;
    });
  }

  addEventListeners() {
    const header = this.element.querySelector('[data-element="header"]');
    const headerCells = header.querySelectorAll('.sortable-table__cell');

    headerCells.forEach(cell => {
      cell.addEventListener('click', () => {

        const field = cell.dataset.id;
        (cell.dataset.order && cell.dataset.order === "asc") ? this.sort(field, "desc") : this.sort(field, "asc");

      })
    })
  }

  createTableHeaderTemplate() {

    return this.config.map(columnConfig => {
      return `<div class="sortable-table__cell" data-id="${columnConfig['id']}" data-sortable="${columnConfig['sortable']}">
                <span>${columnConfig['title']}</span></div>`
    }).join('');
  }

  createTableBodyCellTemplate(product, columnConfig) {
    const fieldId = columnConfig['id'];

    if (columnConfig['template']) {
      return columnConfig.template(product);
    } else {
      return `<div class="sortable-table__cell">${product[fieldId]}</div>`;
    }
  }

  createTableBodyRowTemplate(product) {
    return `
            <a href="/products/${product.id}" class="sortable-table__row">
                ${this.config.map(columnConfig =>
      this.createTableBodyCellTemplate(product, columnConfig)
    ).join('')}
            </a>
        `
  }

  createTableBodyTemplate() {
    return this.data.map(product => {

      return this.createTableBodyRowTemplate(product);

    }).join('')
  }

  createTable(template) {
    const element = document.createElement('div');
    element.className = 'products-list__container';
    element.dataset.element = 'productsContainer';
    element.innerHTML = template;
    return element;
  }

  template() {
    return `
            <div class="sortable-table">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createTableHeaderTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.createTableBodyTemplate()}
                </div>
                <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
                <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
                    <div>
                        <p>No products satisfies your filter criteria</p>
                        <button type="button" class="button-primary-outline">Reset all filters</button>
                    </div>
                </div>
            </div>
        `;
  }

  sort(fieldValue, orderValue) {

    function sortString(a, b) {
      return (
        a.localeCompare(b, ["ru", "en"], {
          caseFirst: "upper",
          numeric: true,
        })
      );
    }

    function sortNum(a, b) {
      return (a - b);
    }

    const sortColumn = this.config.find(
      (column) => column.id === fieldValue
    );

    if (!this.data || !sortColumn) {
      return;
    }

    if (orderValue === 'asc') {
      this.data.sort((a, b) => {
        if (sortColumn.sortType === "string") {
          return sortString(a[fieldValue], b[fieldValue]);
        } else {
          return sortNum(a[fieldValue], b[fieldValue]);
        }
      });
    } else {
      this.data.sort((a, b) => {
        if (sortColumn.sortType === "string") {
          return sortString(b[fieldValue], a[fieldValue]);
        } else {
          return sortNum(b[fieldValue], a[fieldValue]);
        }
      });
    }

    this.updateTableBody();
    this.updateTableHeader(fieldValue, orderValue);
  }

  updateTableBody() {
    const tableBody = document.querySelector('.sortable-table__body');
    tableBody.innerHTML = this.createTableBodyTemplate();
  }

  updateTableHeader(fieldValue, orderValue) {

    return this.config.map(columnConfig => {
      const columnSortArrow = '<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>';
      const cell = document.querySelector(`[data-id="${columnConfig.id}"]`);

      if (columnConfig['id'] === fieldValue) {
        const sortedHeaderCell = document.querySelector(`[data-id="${fieldValue}"]`);


        sortedHeaderCell.dataset.order = orderValue;
        sortedHeaderCell.dataset.sortable = true;

        if (!sortedHeaderCell.innerHTML.includes(columnSortArrow)) {
          sortedHeaderCell.insertAdjacentHTML('beforeend', columnSortArrow);
        }

      } else {
        if (cell.innerHTML.includes(columnSortArrow)) {
          cell.innerHTML = cell.innerHTML.replace(columnSortArrow, '');
        }
      }

    }).join('');
  }

  destroy() {
    this.element.remove();
  }
}

