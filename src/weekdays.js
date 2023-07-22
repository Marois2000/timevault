export function getWeekDays(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const result = [];
    
    // Get the start of the week (Sunday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(date);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const startFormat = startOfWeek.getFullYear() + "/" + (startOfWeek.getMonth()+1) + "/" + startOfWeek.getDate();
    let month = endOfWeek.getMonth() + 1
    if(endOfWeek.getMonth() > startOfWeek.getMonth()) {
      month -= 1;
    }
    const endFormat = endOfWeek.getFullYear() + "/" + month + "/" + endOfWeek.getDate();

    // Iterate through each day of the week
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(currentDate.getDate() + i);
      
      result.push({
        date: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
        startdate: startFormat,
        enddate: endFormat
      });
    }
    
    return result;
  }
