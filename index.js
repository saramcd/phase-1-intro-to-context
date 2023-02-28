const createEmployeeRecord = (employeeRecord) => {
  const employeeRecordObj = {
    firstName: employeeRecord[0],
    familyName: employeeRecord[1],
    title: employeeRecord[2],
    payPerHour: employeeRecord[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employeeRecordObj;
};

const createEmployeeRecords = (employeeRecords) => {
  const employeeRecordsArray = [];
  employeeRecords.forEach((record) => {
    employeeRecordsArray.push(createEmployeeRecord(record));
  });
  return employeeRecordsArray;
};

const createTimeInEvent = (employeeRecordObj, dateStamp) => {
  const timeInObj = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  };
  employeeRecordObj.timeInEvents.push(timeInObj);
  return employeeRecordObj;
};

const createTimeOutEvent = (employeeRecordObj, dateStamp) => {
  const timeOutObj = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(11)),
    date: dateStamp.slice(0, 10),
  };
  employeeRecordObj.timeOutEvents.push(timeOutObj);
  return employeeRecordObj;
};

const hoursWorkedOnDate = (employeeRecordObj, date) => {
  let timeIn;
  let timeOut;
  for (const timeInEvent of employeeRecordObj.timeInEvents) {
    if (timeInEvent.date === date) {
      timeIn = timeInEvent.hour;
    }
  }
  for (const timeOutEvent of employeeRecordObj.timeOutEvents) {
    if (timeOutEvent.date === date) {
      timeOut = timeOutEvent.hour;
    }
  }
  const hoursWorked = (timeOut - timeIn) / 100;
  return hoursWorked;
};

const wagesEarnedOnDate = (employeeRecordObj, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeRecordObj, date);
  const payRate = employeeRecordObj.payPerHour;
  return hoursWorked * payRate;
};

const allWagesFor = (employeeRecordObj) => {
  const workedDays = [];
  for (const timeInEvent of employeeRecordObj.timeInEvents) {
    workedDays.push(timeInEvent.date);
  }
  let total = 0;
  workedDays.forEach((day) => {
    const wages = wagesEarnedOnDate(employeeRecordObj, day);
    total += wages;
  });
  return total;
};

const calculatePayroll = (employeeRecordsArray) => {
  let allWages = 0;
  employeeRecordsArray.forEach((employeeRecord) => {
    const wages = allWagesFor(employeeRecord);
    allWages += wages;
  });
  return allWages;
};
