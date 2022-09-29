const current = new Date();

//* getting month
export const calcMonth = month => {
    switch(month) {
        case 0:
            return {
                name: 'January',
                days: 31
            }
        case 1:
            return {
                name: 'January',
                days: 28
            }
        case 2:
            return {
                name: 'March',
                days: 31
            }
        case 3:
            return {
                name: 'April',
                days: 30
            }
        case 4:
            return {
                name: 'May',
                days: 31
            }
        case 5:
            return {
                name: 'June',
                days: 30
            }
        case 6:
            return {
                name: 'July',
                days: 31
            }
        case 7:
            return {
                name: 'August',
                days: 31
            }
        case 8:
            return {
                name: 'September',
                days: 30
            }
        case 9:
            return {
                name: 'October',
                days: 31
            } 
        case 10:
            return {
                name: 'November',
                days: 30
            }
        case 11:
            return {
                name: 'December',
                days: 31
            }
        default: return false
    }
};

//* getting week
export const getWeek = () => {
    let week = []; 
        
    const month = current.getMonth();
    const monthInfo = calcMonth(month)

    const firstDay = new Date(current.setDate(current.getDate() - current.getDay())).getDate()+1;
    const lastDay = new Date(current.setDate(current.getDate() - current.getDay() + 6)).getDate()+1;

    //* create day
    const createDay = index => new Date(current.getUTCFullYear(), month, index)

    //* creating dates
    if ((firstDay+7) > monthInfo.days) {
        for (let i = firstDay; i <= monthInfo.days; i++) {
            week.push(createDay(i))
        }
        for (let i = 1; i <= lastDay; i++) {
            week.push(createDay(i))
        }

    } else {
        for (let i = firstDay; i <= lastDay; i++) {
            week.push(createDay(i))
        }
    }

    return week
};

//* date format
export const formatAMPM = time => {
    const arr = time.split(':');
    var hours = +arr[0];
    var minutes = +arr[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};