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
        
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(new Date(current)); 
        current.setDate(current.getDate() +1);
    }
    return week; 
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