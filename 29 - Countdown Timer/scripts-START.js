let countDown;
const showTimer = document.querySelector(".display__time-left");
const showEndTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countDown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countDown = setInterval(() => {
    const secondLeft = Math.round((then - Date.now()) / 1000);
    if (secondLeft <= 0) {
      clearInterval(countDown);
    }
    displayTimeLeft(secondLeft);
  }, 1000);
}
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  showTimer.textContent = display;
  document.title = display;
  console.log(minutes, remainderSeconds);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  showEndTime.textContent = `Be back at ${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${hours > 12 ? "PM" : "AM"}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((buttons) => buttons.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
