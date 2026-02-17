function attendance_schedule_onload() {
  const data_table_dom = document.querySelector("figure#data-table");
  if (!data_table_dom) {
    console.log("data table is not found.");
    return true;
  }
  const data = data_table_dom.children[0].children[0].children;
  if (data.length < 2) {
    return true;
  }
  let columns = [];
  for (let a = 1; a < data[0].children.length; a++) {
    columns.push(data[0].children[a].innerHTML);
  }
  if (columns.length < 1) {
    return true;
  }
  let rows = [];
  let list = {};
  for (let a = 1; a < data.length; a++) {
    rows.push(`${data[a].children[0].innerHTML}`);
    list[rows[a-1]] = [];
    for (let b = 1; b < columns.length; b++) {
      let attend = false;
      ["o", "O", "〇"].forEach(c => attend = (data[a].children[b].innerHTML == c)? true : attend);
      if (attend) {
        list[rows[a-1]].push(columns[b-1]);
      }
    }
  }
  console.log(list);
  if (rows.length == 0) {
    console.log("list is empty.");
    return true;
  }
  let started = false;
  let list_index = 0
  const show_table_dom = document.createElement("table");
  const show_table_row_dom = document.createElement("tr");
  show_table_dom.appendChild(show_table_row_dom);
  for (let b = 0; b < 7; b++) {
    const show_table_column_dom = document.createElement("td");
    show_table_column_dom.innerHTML = (b == 0)? "SUN" : (b == 1)? "MON" : (b == 2)? "TUE" : (b == 3)? "WED" : (b == 4)? "THU" : (b == 5)? "FRI" : "SAT";
    show_table_row_dom.appendChild(show_table_column_dom);
  }
  for (let a = 0; a < 5; a++) {
    const show_table_row_dom = document.createElement("tr");
    show_table_dom.appendChild(show_table_row_dom);
    for (let b = 0; b < 7; b++) {
      const show_table_column_dom = document.createElement("td");
      show_table_row_dom.appendChild(show_table_column_dom);    
      if (list_index >= rows.length) {
        continue;
      }
      if (!started) {
        let date = rows[list_index].split("-");
        if (date.length != 4) {
          console.log("Unexpected data format found.");
          return true;
        }
        date[3] = (date[3] == "SUN")? 0 : (date[3] == "MON")? 1 : (date[3] == "TUE")? 2 : (date[3] == "WED")? 3 : (date[3] == "THU")? 4 : (date[3] == "FRI")? 5 : 6;
        if (b == date[3]) {
          started = true;
        }
      }
      if (started) {
        const text = document.createElement("span");
        text.innerHTML = `${String(date[2]).padStart(2, "0")}`;
        show_table_column_dom.appendChild(text);
        for (let c = 0; c < list[rows[list_index]].length; c++) {
          const text = document.createElement("span");
          text.innerHTML = `${list[rows[list_index]][c]}`;
          show_table_column_dom.appendChild(text);
        }
        list_index = list_index + 1;
      }
    }
  }
  const show_table_div_dom = document.querySelector("#show-table-div");
  if (!show_table_div_dom) {
    console.log("show table div element is not found");
    return true;
  }
  show_table_div_dom.appendChild(show_table_dom);
  return false;
}

window.addEventListener("load", attendance_schedule_onload);
