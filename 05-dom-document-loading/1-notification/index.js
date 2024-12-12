export default class NotificationMessage {
  static lastShownComponent = null;

  constructor(message = "", {type = "success", duration = 2000} = {}) {

    this.message = message;
    this.type = type;
    this.duration = duration;
    this.element = this.createElement(this.createTemplate());

  }

  createTemplate() {

    function formatDuration(duration) {
      return duration / 100 + 's'
    }

    return (
      `<div class="notification ${this.type}" style="--value:${formatDuration(this.duration)}">
                <div class="timer"></div>
                <div class="inner-wrapper">
                    <div class="notification-header">${this.type}</div>
                    <div class="notification-body">
                        ${this.message}
                    </div>
                </div>
            </div>`
    )
  }

  show(parentElement) {

    if (NotificationMessage.lastShownComponent) {
      NotificationMessage.lastShownComponent.remove();
    }

    NotificationMessage.lastShownComponent = this;


    if (parentElement) {
      parentElement.appendChild(this.element);
    } else {
      document.body.appendChild(this.element);
    }

    this.timerId = setTimeout(() => {
      this.remove()
    }, this.duration);

  }

  remove() {

    if (document.body.contains(this.element)) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
    clearTimeout(this.timerId);
  }


  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }
}
