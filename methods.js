const Papa = require('papaparse');

function csvToObjArray(csv) {
  let { data: rows } = Papa.parse(csv, {skipEmptyLines: true,});
  const columns = rows.shift();
  
  return rows.map((row) => {
    let obj = {};
    let index = 0;
    
    for (const column of columns) {
      obj[column] = row[index];
      index++;
    }
    
    return obj;
  });
}

function convertTimesheet(csv) {
  const clockifyEntries = csvToObjArray(csv);
  
  if (!clockifyEntries) {
    console.log('parsing error');    
    return;
  }
  
  const entries = clockifyEntries.map((clockifyEntry) => {
    // Start date
    const startDate = clockifyEntry['Start Date'].split(' ');
    startDate.reverse();
    const date = startDate.join('-');

    return {
      'Start Date': date,
      'Start Time': clockifyEntry['Start Time'],
      Duration: clockifyEntry['Duration (h)'],
      Description: clockifyEntry.Description,
      Project: clockifyEntry.Project,
      //Client: clockifyEntry.Client,
      //Task: clockifyEntry.Task,
      Email: clockifyEntry.Email,
      //User: clockifyEntry.User,
      //Tags: clockifyEntry.Tags,
      //Billable: clockifyEntry.Billable,
    };
  });

  return Papa.unparse(entries);
}

module.exports = { csvToObjArray, convertTimesheet };
