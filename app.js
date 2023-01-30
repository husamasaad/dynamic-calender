// Selectors
const caleder = document.querySelector('.calender'),
  date = document.querySelector('.date'),
  daysContainer = document.querySelector('.days'),
  prev = document.querySelector('.prev'),
  next = document.querySelector('.next'),
  todayBtn = document.querySelector('.today'),
  gotoBtn = document.querySelector('.goto-btn'),
  dateInput = document.querySelector('.date-input'),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn"),
  closeSideBar = document.querySelector('.close-sidebar'),
  sideBar = document.querySelector('.right');
  

// Setting up Today's Date
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "Marh",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// const eventsArr = [
//   {
//     day: 10,
//     month: 1,
//     year: 2023,
//     events: [
//       {
//         title: "Event 1 do something good",
//         time: "11:00 AM"
//       },
//       {
//         title: "Event 2 do something nice",
//         time: "11:00 AM"
//       },
//     ],
//   }
// ];

let eventsArr = [];

getEvents();

// main Function to build the calender
function initCalender() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  // adding previous month days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`
  }

  // adding this month days
  for (let i = 1; i <= lastDate; i++) {

      // Check for events on current day

      let event = false;

      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          event = true
        }
      })


    if (i == new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  // adding next month days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }

  daysContainer.innerHTML = days;
  addListener();
}


initCalender();


// handling prev Arrow
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalender();
}

// handling next Arrow
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalender();
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

// hanldle today button
todayBtn.addEventListener('click', () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalender();
});

// handling go-to input
dateInput.addEventListener("keyup", (e) => {
  // to allow only numbers input
  dateInput.value = dateInput.value.replace(/[^0-9/\b]/g, "");

  // automatic adding a slash between (mm/yyyy)
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }

  // only allow 7 numbers input
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }

  // automatic deleting the backslash
  if (e.key == "Backspace") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});


gotoBtn.addEventListener('click', gotoDate);


function gotoDate() {
  const dateArr = dateInput.value.split('/');

  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalender();
      dateInput.value = ''
      return;
    }
  }

  // for invalid input
  document.querySelector('.goto').style.borderColor = 'red';
  dateInput.addEventListener('click', () => {
    document.querySelector('.goto').style.borderColor = 'var(--primary-clr)';
  })
}


const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector('.add-event-wrapper'),
  addEventCloseBtn = document.querySelector('.close'),
  addEventTitle = document.querySelector('.event-name'),
  addEventFrom = document.querySelector('.event-time-from'),
  addEventTo = document.querySelector('.event-time-to');


addEventBtn.addEventListener('click', () => {
  addEventContainer.classList.toggle("active");
})
addEventCloseBtn.addEventListener('click', () => {
  addEventContainer.classList.remove("active");
})

// clicking out side the container
document.addEventListener('click', (e) => {
  if ((e.target !== addEventBtn) && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

addEventTitle.addEventListener('input', (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
})

addEventFrom.addEventListener('keyup', (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 4) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
  if (e.key == "Backspace") {
    if (addEventFrom.value.length === 3) {
      addEventFrom.value = addEventFrom.value.slice(0, 2);
    }
  }
})

addEventTo.addEventListener('keyup', (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 4) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
  if (e.key == "Backspace") {
    if (addEventFrom.value.length === 3) {
      addEventFrom.value = addEventFrom.value.slice(0, 2);
    }
  }
})


// adding listeners to days

function addListener() {
  const days = document.querySelectorAll('.day');

  days.forEach((day) => {
    day.addEventListener('click', (e) => {
      // set current day on active day
      activeDay = Number(e.target.innerHTML);


      days.forEach((day) => {
        day.classList.remove('active');
      });

      // go to prev month when clicking on prev-month-day
      if (e.target.classList.contains('prev-date')) {
        prevMonth();
        setTimeout(() => {
          const days = document.querySelectorAll('.day');
          days.forEach((day) => {
            if (!day.classList.contains("prev-date") && day.innerHTML === e.target.innerHTML ) {
              day.classList.add('active');
            }
          })
        }, 200);
      }

      // go to next month when clicking on next-month-day
      else if (e.target.classList.contains('next-date')) {
        nextMonth();
        setTimeout(() => {
          const days = document.querySelectorAll('.day');
          days.forEach((day) => {
            if (!day.classList.contains("next-date") && day.innerHTML === e.target.innerHTML ) {
              day.classList.add('active');
            }
          })
        }, 100);
      } else {
        e.target.classList.add('active');
      }

      getActiveDay(e.target.innerHTML);
      closeSideBar.click();
      updateEvents(Number(e.target.innerHTML));
    })
  })
  
}

// Showing active day info

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];

  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// Showing active day events

function updateEvents(date) {
  let events = "";
  
  eventsArr.forEach((ev) => {
    console.log(month)
    if (
      date === ev.day &&
      month + 1 === ev.month &&
      year === ev.year
    ) {
      console.log('hi')
    ev.events.forEach((event) => {
        events += `
          <div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
          </div>
        `;
      });
    }
  });

  if (events === "") {
    events = `<div class="no-event">
      <h3>No Events</h3>
      </div>`;
  }

  eventsContainer.innerHTML = events;
  saveEvents();
}


// adding events

addEventSubmit.addEventListener('click', () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  const timeFromArr = eventTimeFrom.split(':');
  const timeToArr = eventTimeTo.split(':');

  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[0] > 59
  ) {
    alert('invalid Time Format')
  }
  
  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };

  let eventAdded = false;

  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    })
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent]
    });
  }

  addEventContainer.classList.remove('active');
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";

  updateEvents(activeDay);


  const activeDayElem = document.querySelector('.day.active');
  if (!activeDayElem.classList.contains("event")) {
    activeDayElem.classList.add("event")
  }
})

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour > 12 ? "PM" : "AM";

  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;

  return time;
}

eventsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains("event")) {
    const eventTitle = e.target.children[0].children[1].innerHTML;

    eventsArr.forEach((event) => {
      if (
        event.day === activeDay &&
        event.month === month + 1 &&
        event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1)
            }
          })

          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            const activeDayElem = document.querySelector(".day.active");
            if (activeDayElem.classList.contains('event')) {
              activeDayElem.classList.remove('event');
            }
          }
        }
    });
    updateEvents(activeDay)
  }
})


// Working with Local Storage

function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }

  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}


// Handle mobile sidebar

closeSideBar.addEventListener('click', () => {
  if (!sideBar.classList.contains('show')) {
    sideBar.classList.add('show');
    closeSideBar.innerHTML = `<i class="fas fa-angle-right"></i>`;
  } else {
    sideBar.classList.remove('show');
    closeSideBar.innerHTML = `<i class="fas fa-angle-left"></i>`;
  }
})