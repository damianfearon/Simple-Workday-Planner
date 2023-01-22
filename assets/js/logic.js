
var currentDay = $("#currentDay");
var timeBlocks = $(".container");

function showTime() {
  var now = moment().format("DD MMM YYYY [at] hh:mm:ss a");
  currentDay.text(now);
}

function hourOfWorkingDay() {
  var hour = moment().hour();
  return hour;
 
}


var workingHours = [
  [9, "am"],
  [10, "am"],
  [11, "am"],
  [12, "pm"],
  [13, "pm"],
  [14, "pm"],
  [15, "pm"],
  [16, "pm"],
  [17, "pm"],
];

function amPm(index) {
  if (workingHours[index][0] <= 12) {
    return workingHours[index][0] + " " + workingHours[index][1];
  }
  if (workingHours[index][0] > 12) {
    return workingHours[index][0] - 12 + " " + workingHours[index][1];
  }
}

var timeRow;

function setTimeBlocks() {
  for (var i = 0; i < workingHours.length; i++) {
    timeRow = $(`<div id="id-${i}" class="row">
      </div>`);

    if (workingHours[i][0] < hourOfWorkingDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4> ${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description past">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    if (workingHours[i][0] === hourOfWorkingDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description present">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    if (workingHours[i][0] > hourOfWorkingDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description future">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    timeBlocks.append(timeRow);
  }
}

setTimeBlocks();
hourOfWorkingDay();

var dailyTasks = {};

function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(dailyTasks));
}

function persistEvents() {
  var storage = JSON.parse(localStorage.getItem("tasks"));

  for (var task in storage) {
    dailyTasks[task] = storage[task];
    $(`#${task}`).children("textarea").text(`${storage[task]}`);
  }
}

persistEvents();

var saveBtn = $("button");


saveBtn.click(function () {
  var rowId = $(this).parent().attr("id");
  var textareaValue = $(`#${rowId}`).children("textarea").val();

  dailyTasks[rowId] = textareaValue;

  storeTasks();
});


setInterval(showTime, 1000);


setTimeout(function () {
  location.reload();
}, 1000 * (60 - moment().minutes()));