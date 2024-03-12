

function updateClock() {
    // Get the current time in Tahiti (UTC-10:00)
    const tahitiTime = new Date();
    tahitiTime.setUTCHours(tahitiTime.getUTCHours() - 10);

    // Convert hours to 12-hour format and determine AM/PM
    let hours = tahitiTime.getUTCHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // Format the time as hh:mm:ss AM/PM
    const minutes = String(tahitiTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(tahitiTime.getUTCSeconds()).padStart(2, '0');

    // Update the clock element
    const digitalClock = document.getElementById('digitalClock');
    digitalClock.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

    // JavaScript to toggle the 'open' class on click
    // const accordionItem = document.querySelector('.u-accordion-item');
    // accordionItem.addEventListener('click', function () {
    //     this.classList.toggle('open');
    // });
}

// Update the clock every second
setInterval(updateClock, 1000);

// Run the updateClock function once on page load
window.onload = updateClock;