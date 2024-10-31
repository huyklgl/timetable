const clockLabels=[
{hour:1,text:''},
{hour:2,text:'xứ sở mộng mơ'},
{hour:3,text:''},
{hour:4,text:''},
{hour:5,text:'buổi sáng'},
{hour:6,text:''},
{hour:7,text:'chơi game'},
{hour:8,text:''},
{hour:9,text:''},
{hour:10,text:'đọc manga'},
{hour:11,text:''},
{hour:12,text:'ngủ trưa'},
{hour:13,text:''},
{hour:14,text:'chơi game'},
{hour:15,text:''},
{hour:16,text:'đọc manga'},
{hour:17,text:''},
{hour:18,text:''},
{hour:19,text:'chơi game'},
{hour:20,text:'đọc manga'},
{hour:21,text:'workshop'},
{hour:22,text:''},
{hour:23,text:''},
{hour:24,text:''}];function initializeClock(){const clockElement=document.querySelector('.clock');const indicatorElement=document.querySelector('.indicator');clockLabels.forEach(label=>{const labelElement=document.createElement('label');labelElement.style.setProperty('--i',label.hour);const spanElement=document.createElement('span');spanElement.textContent=label.hour;labelElement.appendChild(spanElement);if(label.text){const pElement=document.createElement('p');pElement.textContent=label.text;labelElement.appendChild(pElement)}
clockElement.insertBefore(labelElement,indicatorElement)})}
const hourHand=document.querySelector(".hand.hour");const minuteHand=document.querySelector(".hand.minute");const secondHand=document.querySelector(".hand.second");const indicator=document.querySelector(".indicator");let isSpinning=!1;let clockDisabled=!1;let currentTime;const spinningSound=new Audio('//github.com/tranbinh02/STORAGE_BOX/raw/main/spin.mp3');const luckySpinSound=new Audio('//github.com/tranbinh02/STORAGE_BOX/raw/main/clap.mp3');function updateClockHands(){if(clockDisabled)return;const secToDeg=(currentTime.seconds/60)*360;const minToDeg=((currentTime.minutes*60+currentTime.seconds)/3600)*360;const hrToDeg=((currentTime.hours%12*3600+currentTime.minutes*60+currentTime.seconds)/43200)*360;secondHand.style.transform=`rotate(${secToDeg}deg)`;minuteHand.style.transform=`rotate(${minToDeg}deg)`;hourHand.style.transform=`rotate(${hrToDeg}deg)`}
function updateTime() {
    const now = new Date();
    // Adjust the time for Vietnam (UTC+7)
    const utcOffset = 7 * 60 * 60 * 1000; // UTC offset in milliseconds
    const localTime = new Date(now.getTime() + utcOffset);
    currentTime = {
        hours: localTime.getHours(),
        minutes: localTime.getMinutes(),
        seconds: localTime.getSeconds()
    };
    updateClockHands();
}
function startClock(){    updateTime(); // Cập nhật thời gian ngay khi bắt đầu
    if (!clockDisabled) {
        requestAnimationFrame(clockTick); // Bắt đầu vòng lặp
    }}
function clockTick(timestamp) {
    if (clockDisabled) return;
    updateTime(); // Cập nhật thời gian
    requestAnimationFrame(clockTick); // Gọi lại chính nó
}
function disableClock(){clockDisabled=!0;minuteHand.style.display='none';secondHand.style.display='none'}
function enableClock(){clockDisabled=!1;minuteHand.style.display='';secondHand.style.display='';startClock()}
function spin(){if(isSpinning)return;isSpinning=!0;disableClock();const minRotations=3;const maxAdditionalRotations=5;const totalRotations=minRotations+Math.random()*maxAdditionalRotations;const spinDuration=5000;const startTime=performance.now();const startRotation=getCurrentRotation(hourHand);spinningSound.currentTime=0;spinningSound.play();function spinAnimation(currentTime){const elapsedTime=currentTime-startTime;const progress=Math.min(elapsedTime/spinDuration,1);const easedProgress=1-Math.pow(1-progress,3);const additionalRotation=easedProgress*totalRotations*360;const newRotation=startRotation+additionalRotation;hourHand.style.transform=`rotate(${newRotation}deg)`;if(progress<1){requestAnimationFrame(spinAnimation)}else{isSpinning=!1;const nearestHour=Math.round(newRotation/30)%12;currentTime={hours:nearestHour===0?12:nearestHour,minutes:0,seconds:0};updateClockHands();enableClock();spinningSound.pause();luckySpinSound.currentTime=0;luckySpinSound.play()}}
requestAnimationFrame(spinAnimation)}
function getCurrentRotation(element){const style=window.getComputedStyle(element);const matrix=new DOMMatrix(style.transform);return Math.atan2(matrix.b,matrix.a)*(180/Math.PI)}
document.addEventListener('DOMContentLoaded',()=>{    initializeClock(); // Khởi tạo đồng hồ
    indicator.addEventListener("click", () => {
        if (!isSpinning) {
            spin(); // Thực hiện quay
        }
    });
    startClock(); // Bắt đầu đồng hồ});
/*!
 * CustomTooltips
 * A very simple and lightweight tooltips system created with vanilla JavaScript
 *
 * @version v1.0
 * @author oscarcweb <rehr_roste@aleeas.com>
 * @github https://github.com/oscarcweb/CustomTooltips
 * @license MIT
 */
!function () {function t() {return Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth);}t();function e(e = 0) {var n = 0;document.onmousemove = function (d) {if (!e && !n) {var l = d.clientX + 5 + window.scrollX,i = d.clientY + 15 + window.scrollY,c = document.getElementById("tooltip-js");l + c.offsetWidth > t() ? (l -= c.offsetWidth, o.classList.add("arrow-left")) : o.classList.remove("arrow-left"), i + c.offsetHeight > Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.documentElement.clientHeight) && (i -= c.offsetHeight), o.style.top = i + "px", o.style.left = l + "px", n = 0;}};}!document.getElementById("tooltip-js") && document.body.insertAdjacentHTML("beforeend", '<div id="tooltip-js"></div>');let o = document.getElementById("tooltip-js");document.querySelectorAll("[data-tooltip]").forEach(t => {let n = t.getAttribute("data-tooltip");t.addEventListener("mouseover", function (t) {e(), o.innerHTML = n, o.style.display = "block";}), t.addEventListener("mouseleave", function (t) {e(1), o.style.display = "none";});});}();
/*!
 * DarkMode Toggle
 */
const toggle = document.querySelector('[aria-pressed]');
document.documentElement.dataset.theme = 'light';
const flip = () => {
  const isPressed = toggle.matches('[aria-pressed=true]');
  document.documentElement.dataset.theme = isPressed ? 'light' : 'dark';
  toggle.setAttribute('aria-pressed', isPressed ? false : true);
};
const toggleTheme = () => {
  if (!document.startViewTransition) return flip();
  document.startViewTransition(() => flip());
};
toggle.addEventListener('click', toggleTheme);
