export default class ColumnChart {
  constructor({label = "Total orders", value = "", link="", data="", chartHeight=50, formatHeading=""} = {}) {

    this.label = label;
    this.value = value;
    this.link = link;
    this.data = data;
    this.chartHeight = chartHeight;
    this.formatHeading = formatHeading;

    this.element = this.createElement(this.createTemplate());
  }


  createTemplate() {

    let formatHeading = (func, value) => (!func) ? value : func(value);

    let templateClass = (data) => (!data.length) ? `column-chart column-chart_loading` : `column-chart`;

    return (
      `<div class="${templateClass(this.data)}" style="--chart-height: ${this.chartHeight}">
            <div class="column-chart__title">
                Total ${this.label}

                ${this.createLinkTemplate()}

            </div>
            <div class="column-chart__container">
                <div data-element="header" class="column-chart__header">${formatHeading(this.formatHeading, this.value)}</div>

                <div data-element="body" class="column-chart__chart">
                    ${this.createChartBodyTemplate()}
                </div>
            </div>
        </div>`
    )}

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }


  createChartBodyTemplate() {

    function getColumnProps(data, height, item) {
      const maxValue = Math.max(...data);
      const scale = height / maxValue;

      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: Math.floor(item * scale)
      }
    }

    if (this.data.length) {

      return this.data.map(item => (
        `<div style="--value: ${getColumnProps(this.data, this.chartHeight, item).value}"  data-tooltip="${getColumnProps(this.data, this.chartHeight, item).percent}"></div>`
      )).join('');

    }
    else {
      return (
        ``
      )
    }
  }

  createLinkTemplate() {
    if (this.link) {
      return('<a href="/sales" class="column-chart__link">View all</a>');
    } else {
      return '';
    }
  }


  update({data=""} = {}) {
    this.data = data;
    this.createChartBodyTemplate();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

