class createProgressCircle {
  constructor(
    parentId,
    options = { animate: false, hide: false, controls: false }
  ) {
    this.parentElement = document.getElementById(parentId);
    this.state = options;
    if (!this.parentElement)
      return console.error("Родительский элемент не найден");
    this.parentElement.classList.add("progress");
    this.createProgressCircle();
    if (this.state.controls) this.createControls();
  }

  createProgressCircle() {
    this.progressCircle = document.createElement("div");
    this.progressCircle.classList.add("progress-circle", "ratate-circle");
    if (!this.state.animate)
      this.progressCircle.classList.add("ratate-circle-paused");
    this.parentElement.appendChild(this.progressCircle);

    this.currentValue = 0;
    this.interval;
    this.isIntervalStart = false;

    this.input = document.createElement("input");
  }

  createControls() {
    this.controllers = document.createElement("div");
    this.controllers.classList.add("progress-controls");
    this.parentElement.appendChild(this.controllers);
    this.progressCircle.style.display = this.state.hide ? "none" : "flex";

    this.input.type = "number";
    this.input.min = 0;
    this.input.max = 100;
    this.input.value = 0;
    this.controllers.appendChild(this.input);

    this.input.addEventListener("input", () => {
      this.setValue(this.input.value);
    });

    this.label = document.createElement("label");
    this.label.textContent = "Value";
    this.controllers.appendChild(this.label);

    this.toggleAnimate = document.createElement("input");
    this.toggleAnimate.type = "checkbox";
    this.toggleAnimate.checked = this.state.animate;
    this.controllers.appendChild(this.toggleAnimate);

    this.toggleAnimate.addEventListener("change", () => {
      if (this.toggleAnimate.checked) {
        this.progressCircle.classList.remove("ratate-circle-paused");
      } else {
        this.progressCircle.classList.add("ratate-circle-paused");
      }
    });

    this.label = document.createElement("label");
    this.label.textContent = "Animate";
    this.controllers.appendChild(this.label);

    this.toggleHide = document.createElement("input");
    this.toggleHide.type = "checkbox";
    this.toggleHide.checked = this.state.hide;
    this.controllers.appendChild(this.toggleHide);

    this.toggleHide.addEventListener("change", () => {
      this.progressCircle.style.display = this.toggleHide.checked
        ? "none"
        : "flex";
    });

    this.label = document.createElement("label");
    this.label.textContent = "Hide";
    this.controllers.appendChild(this.label);
  }

  setValue(value) {
    const parseValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    this.input.value = parseValue;

    if (this.isIntervalStart) clearInterval(this.interval);
    this.animateProgress(parseValue);
  }

  animateProgress(newValue) {
    const step = newValue > this.currentValue ? 1 : -1;
    if (this.currentValue === newValue) {
      return;
    }
    this.isIntervalStart = true;
    this.interval = setInterval(() => {
      this.currentValue += step;
      this.updateProgress(this.currentValue);
      if (this.currentValue === newValue || this.currentValue === 100) {
        this.isIntervalStart = false;
        clearInterval(this.interval);
      }
    }, 20);
  }

  updateProgress(value) {
    const progressValue = value / 100;
    this.progressCircle.style.background = `conic-gradient(#005BFE 0% ${
      progressValue * 100
    }%, #eef2f5 ${progressValue * 100}% 100%)`;
  }
}
