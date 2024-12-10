class IFrameToggle {
    constructor(iframe) {
      this.iframe = iframe;
      this.toggleButton = this.iframe.querySelector(".js-iframe-toggle");
      this.open = false;
  
      this.eventHandlers();
      this.update();
    }
  
    eventHandlers() {
      this.toggleButton.addEventListener("click", () => this.toggle());
    }
  
    toggle() {
      this.open = !this.open;
      this.update();
    }
  
    update() {
      // set the data attribute on the HTML element
      this.iframe.dataset.open = this.open;
    }
  }
  
  /* using a different class to target this than using in CSS. Just to separate concerns */
  document.querySelectorAll(".js-iframe").forEach((iframe) => {
    new IFrameToggle(iframe);
  });