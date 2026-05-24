const clockLabels = [
  {hour:1,  text:''},
  {hour:2,  text:'xứ sở mộng mơ'},
  {hour:3,  text:''},
  {hour:4,  text:''},
  {hour:5,  text:'buổi sáng'},
  {hour:6,  text:''},
  {hour:7,  text:'chơi game'},
  {hour:8,  text:''},
  {hour:9,  text:''},
  {hour:10, text:'đọc manga'},
  {hour:11, text:''},
  {hour:12, text:'ngủ trưa'},
  {hour:13, text:''},
  {hour:14, text:'chơi game'},
  {hour:15, text:''},
  {hour:16, text:'đọc manga'},
  {hour:17, text:''},
  {hour:18, text:''},
  {hour:19, text:'chơi game'},
  {hour:20, text:'đọc manga'},
  {hour:21, text:'workshop'},
  {hour:22, text:''},
  {hour:23, text:''},
  {hour:24, text:''}
];

function initializeClock() {
  const clockElement   = document.querySelector('.clock');
  const indicatorElement = document.querySelector('.indicator');

  clockLabels.forEach(label => {
    const labelEl = document.createElement('label');
    labelEl.style.setProperty('--i', label.hour);

    const spanEl = document.createElement('span');
    spanEl.textContent = label.hour;
    labelEl.appendChild(spanEl);

    if (label.text) {
      const pEl = document.createElement('p');
      pEl.textContent = label.text;
      labelEl.appendChild(pEl);
    }

    clockElement.insertBefore(labelEl, indicatorElement);
  });
}

const hourHand   = document.querySelector('.hand.hour');
const minuteHand = document.querySelector('.hand.minute');
const secondHand = document.querySelector('.hand.second');
const indicator  = document.querySelector('.indicator');

let isSpinning   = false;
let clockDisabled = false;
let currentTime;

/* ── âm thanh (giữ nguyên như bản gốc) ── */
const spinningSound   = new Audio('//github.com/tranbinh02/STORAGE_BOX/raw/main/spin.mp3');
const luckySpinSound  = new Audio('//github.com/tranbinh02/STORAGE_BOX/raw/main/clap.mp3');

function updateClockHands() {
  if (clockDisabled) return;
  const secToDeg = (currentTime.seconds / 60) * 360;
  const minToDeg = ((currentTime.minutes * 60 + currentTime.seconds) / 3600) * 360;
  /* 24h: một vòng = 24h */
  const hrToDeg  = ((currentTime.hours * 3600 + currentTime.minutes * 60 + currentTime.seconds) / 86400) * 360;
  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform   = `rotate(${hrToDeg}deg)`;
}

function updateTime() {
  const now = new Date();
  currentTime = { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
  updateClockHands();
}

function clockTick() {
  if (clockDisabled) return;
  updateTime();
  requestAnimationFrame(clockTick);
}

function startClock() {
  updateTime();
  if (!clockDisabled) requestAnimationFrame(clockTick);
}

function disableClock() {
  clockDisabled = true;
  minuteHand.style.display = 'none';
  secondHand.style.display = 'none';
}

function enableClock() {
  clockDisabled = false;
  minuteHand.style.display = '';
  secondHand.style.display = '';
  startClock();
}

function getCurrentRotation(element) {
  const matrix = new DOMMatrix(window.getComputedStyle(element).transform);
  return Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
}

function spin() {
  if (isSpinning) return;
  isSpinning = true;
  disableClock();

  const totalRotations = 3 + Math.random() * 5;
  const spinDuration   = 5000;
  const startTime      = performance.now();
  const startRotation  = getCurrentRotation(hourHand);

  spinningSound.currentTime = 0;
  spinningSound.play();

  function spinAnimation(now) {
    const elapsed   = now - startTime;
    const progress  = Math.min(elapsed / spinDuration, 1);
    const eased     = 1 - Math.pow(1 - progress, 3);
    const newRotation = startRotation + eased * totalRotations * 360;

    hourHand.style.transform = `rotate(${newRotation}deg)`;

    if (progress < 1) {
      requestAnimationFrame(spinAnimation);
    } else {
      isSpinning = false;

      /* Tính giờ trên mặt đồng hồ 24h */
      const normalised = ((newRotation % 360) + 360) % 360;   // 0–360
      const hour24     = Math.round(normalised / 15) % 24 || 24; // 15° = 1h

      /* Tìm nhiệm vụ */
      const found = clockLabels.find(l => l.hour === hour24);

      /* Hiện modal */
      showModal(hour24, found && found.text ? found.text : null);

      enableClock();
      spinningSound.pause();
      luckySpinSound.currentTime = 0;
      luckySpinSound.play();
    }
  }
  requestAnimationFrame(spinAnimation);
}

/* ── Modal ── */
function showModal(hour, task) {
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('modalHour').textContent = `${pad(hour)}:00`;
  document.getElementById('modalTask').textContent = task ? task.toUpperCase() : '— TỰ DO —';
  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal(e) {
  if (e && e.target === document.getElementById('modalCard')) return;
  document.getElementById('modalOverlay').classList.remove('show');
}

document.addEventListener('DOMContentLoaded', () => {
  initializeClock();
  indicator.addEventListener('click', () => { if (!isSpinning) spin(); });
  startClock();
});

/* ── Tooltip (giữ nguyên) ── */
!function(){
  function t(){return Math.max(document.body.scrollWidth,document.documentElement.scrollWidth,document.body.offsetWidth,document.documentElement.offsetWidth,document.documentElement.clientWidth);}
  t();
  function e(e=0){var n=0;document.onmousemove=function(d){if(!e&&!n){var l=d.clientX+5+window.scrollX,i=d.clientY+15+window.scrollY,c=document.getElementById("tooltip-js");l+c.offsetWidth>t()?(l-=c.offsetWidth,o.classList.add("arrow-left")):o.classList.remove("arrow-left"),i+c.offsetHeight>Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight)&&(i-=c.offsetHeight),o.style.top=i+"px",o.style.left=l+"px",n=0;}};}
  !document.getElementById("tooltip-js")&&document.body.insertAdjacentHTML("beforeend",'<div id="tooltip-js"></div>');
  let o=document.getElementById("tooltip-js");
  document.querySelectorAll("[data-tooltip]").forEach(t=>{let n=t.getAttribute("data-tooltip");t.addEventListener("mouseover",function(){e(),o.innerHTML=n,o.style.display="block";}),t.addEventListener("mouseleave",function(){e(1),o.style.display="none";});});
}();

/* ── Dark mode toggle ── */
const toggle = document.querySelector('[aria-pressed]');
document.documentElement.dataset.theme = 'light';
const flip = () => {
  const pressed = toggle.matches('[aria-pressed=true]');
  document.documentElement.dataset.theme = pressed ? 'light' : 'dark';
  toggle.setAttribute('aria-pressed', pressed ? 'false' : 'true');
};
const toggleTheme = () => {
  if (!document.startViewTransition) return flip();
  document.startViewTransition(() => flip());
};
toggle.addEventListener('click', toggleTheme);
