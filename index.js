// Your code here

function createEmployeeRecord(arrEmpInfo) {
    const objEmp = {};
    objEmp.firstName = arrEmpInfo[0];
    objEmp.familyName = arrEmpInfo[1];
    objEmp.title = arrEmpInfo[2];
    objEmp.payPerHour = arrEmpInfo[3];
    objEmp.timeInEvents = [];
    objEmp.timeOutEvents = [];
    return objEmp;
}

function createEmployeeRecords(arrEmpInfos) {
    return arrEmpInfos.map(createEmployeeRecord);
}

function createTimeInEvent(objEmp, when) {
    const objTimeIn = {};
    objTimeIn.type = 'TimeIn';
    const arrDateHour = when.split(' ');
    objTimeIn.date = arrDateHour[0]; 
    objTimeIn.hour = parseInt(arrDateHour[1], 10);
    objEmp.timeInEvents.push(objTimeIn);
    return objEmp;
}

function createTimeOutEvent(objEmp, when) {
    const objTimeOut = {};
    objTimeOut.type = 'TimeOut';
    const arrDateHour = when.split(' ');
    objTimeOut.date = arrDateHour[0]; 
    objTimeOut.hour = parseInt(arrDateHour[1], 10);
    objEmp.timeOutEvents.push(objTimeOut);
    return objEmp;
}

function hoursWorkedOnDate(objEmp, date) {
    const objTimeIn = objEmp.timeInEvents.find((objTimeIn, i, timeInEventsCopy) => {
        return objTimeIn.date === date;
    });
    const objTimeOut = objEmp.timeOutEvents.find((objTimeOut, i, timeOutEventsCopy) => {
        return objTimeOut.date === date;
    });

    try {
        return (objTimeOut.hour - objTimeIn.hour) / 100;
    } catch (e) {
        console.log(e.name, e.message);
        console.error(`${e.name}: ${e.message}`);
    }
    return -1;
}

function wagesEarnedOnDate(objEmp, date) {
    return hoursWorkedOnDate(objEmp, date) * objEmp.payPerHour;
}

function allWagesFor(objEmp) {
    return objEmp.timeInEvents.reduce((sumWages, objTimeIn, i, arrTimeInEvents) => {
        return sumWages + wagesEarnedOnDate(objEmp, objTimeIn.date);
    }, 0);
}

function calculatePayroll(arrEmps) {
    return arrEmps.reduce((payroll, objEmp, i, arrEmpsCopy) => {
        return payroll + allWagesFor(objEmp);
    }, 0);
}