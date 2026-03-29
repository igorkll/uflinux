{

let label_time = document.querySelector(".lockscreen-clock-time");
let label_seconds = document.querySelector(".lockscreen-clock-seconds");
let label_date = document.querySelector(".lockscreen-clock-date");

window.updateTime = function () {
    const now = new Date();

    const timeWithoutSeconds = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });

    const seconds = now.getSeconds().toString().padStart(2, '0');

    const date = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });

    label_time.innerText = timeWithoutSeconds;
    label_seconds.innerText = ":" + seconds;
    label_date.innerText = date;
};

updateTime();
setInterval(updateTime, 1000);

}