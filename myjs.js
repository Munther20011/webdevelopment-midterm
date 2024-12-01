const menu = document.getElementById("menu");
const toggleButton = document.getElementById("menu-toggle");

// Add a click event listener to the toggle button
toggleButton.addEventListener("click", () => {
  // Toggle the "display" style of the menu
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "flex"; // Show the menu
  } else {
    menu.style.display = "none"; // Hide the menu
  }
});
var listStudent = [
  [99, "Munther", "Moufeed", "Web Development and Programming", 85, 45, 90],
  [49, "Hamdo", "Alhasan", " Database Desig", 95, 88, 92.2],
  [50, "Kamal", "Alkedra", " Web Development and Programming", 90, 66, 80.4],
  [66, "Ezz", "Younes", " Database Desig", 55, 90, 69],
];
var listCours = [
  [8542, " Web Development and Programming", 7],
  [9564, "Database Management Systems", 7],
  [7854, "Data Structures and Algorithms", 7],
  [8734, "Formal Languages and Abstract Machines", 7],
  
];
isCoursUpdate = false;
isStudentUpdate = false;
document.getElementById("finalScore").addEventListener("change", (e) => {
  var a = document.getElementById("finalScore").value;
  var b = document.getElementById("midtermScore").value;
  document.getElementById("FinalGrade").value = AutomatedGradeCalculation(a, b);
});
document.getElementById("DCours").addEventListener("change", (e) => {
  var v = e.target.value;
  var lt = listStudent.filter((ele) => ele[3] == v);
  var passed = 0;
  var failed = 0;
  var Mscore = 0;
  var cp = 0;
  lt.forEach((element) => {
    if (element[6] < 60) {
      failed += 1;
    } else {
      passed += 1;
    }
    Mscore += element[6];
    cp += 1;
  });
  Mscore = Mscore / cp;
  document.getElementById("passed").value = passed;
  document.getElementById("failed").value = failed;
  document.getElementById("Mscore").value = parseFloat(Mscore).toFixed(2);
});

document.getElementById("add_student").addEventListener("click", () => {
  closeTabs();
  var select = document.getElementById("Cours");
  select.innerHTML = "";
  for (var i = 0; i < listCours.length; i++) {
    var opt = document.createElement("option");
    opt.value = listCours[i][1];
    opt.innerHTML = listCours[i][1];
    select.appendChild(opt);
  }

  var form = document.getElementById("frmStudent");
  form.reset();
  var number = Math.floor(Math.random() * 100) + 1;
  while (
    listStudent.findIndex(
      (course) => parseInt(course[0]) === parseInt(number)
    ) !== -1
  ) {
    number = Math.floor(Math.random() * 100) + 1;
  }
  console.log(number);
  document.getElementById("idStudent").value = number;
  document.getElementById("form_student").classList.remove("d-none");
});
document.getElementById("add_cours").addEventListener("click", () => {
  closeTabs();
  var form = document.getElementById("frmCours");
  form.reset();
  var number = Math.floor(Math.random() * 100) + 1;
  while (
    listCours.findIndex(
      (course) => parseInt(course[0]) === parseInt(number)
    ) !== -1
  ) {
    number = Math.floor(Math.random() * 100) + 1;
  }
  console.log(number);
  document.getElementById("idCours").value = number;
  document.getElementById("form_cours").classList.remove("d-none");
});

document.getElementById("list_cours").addEventListener("click", () => {
  closeTabs();

  filTableCours(listCours);
  document.getElementById("table_cours").classList.remove("d-none");
});

document.getElementById("list_details").addEventListener("click", () => {
  closeTabs();

  var form = document.getElementById("frmCoursDetails");
  form.reset();
  var select = document.getElementById("DCours");
  select.innerHTML = "";
  for (var i = 0; i < listCours.length; i++) {
    var opt = document.createElement("option");
    opt.value = listCours[i][1];
    opt.innerHTML = listCours[i][1];
    select.appendChild(opt);
  }
  document.getElementById("form_CoursDetails").classList.remove("d-none");
});
document.getElementById("student_avarge").addEventListener("click", () => {
  closeTabs();

  filTableAVG(listStudent);
  document.getElementById("table_avg").classList.remove("d-none");
});

document.getElementById("list_student").addEventListener("click", () => {
  closeTabs();
  filTableStudent(listStudent);
  document.getElementById("table_student").classList.remove("d-none");
});
filTableCours(listCours);
document.getElementById("add_std").addEventListener("click", () => {
  document.getElementById("cr").value = document.getElementById("Cours").value;
  var a = document.getElementById("finalScore").value;
  var b = document.getElementById("midtermScore").value;
  document.getElementById("FinalGrade").value = AutomatedGradeCalculation(a, b);

  var list = document
    .getElementById("frmStudent")
    .getElementsByTagName("input");
  var lt = [];
  for (let index = 0; index < list.length - 1; index++) {
    const element = list[index];
    lt.push(element.value);
  }
  if (!isStudentUpdate) {
    listStudent.push(lt);
    document.getElementById("list_student").click();
  } else {
    updateTableStudent(lt);
  }
});
document.getElementById("add_cr").addEventListener("click", () => {
  var list = document.getElementById("frmCours").getElementsByTagName("input");
  var lt = [];
  for (let index = 0; index < list.length - 1; index++) {
    const element = list[index];
    lt.push(element.value);
  }
  if (!isCoursUpdate) {
    listCours.push(lt);
    document.getElementById("list_cours").click();
  } else {
    updateTableCours(lt);
  }
});
function AutomatedGradeCalculation(a, b) {
  return a * 0.4 + b * 0.6;
}
function closeTabs() {
  var forms = document.getElementsByClassName("form");
  for (let index = 0; index < forms.length; index++) {
    forms[index].classList.add("d-none");
  }
  var tb = document.getElementsByClassName("tb");
  for (let index = 0; index < tb.length; index++) {
    tb[index].classList.add("d-none");
  }
}
function filTableCours(list) {
  var tb = document.getElementById("table_cours");
  var tbody = tb.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    var tr = "<tr>";
    var idCours = "";
    for (let j = 0; j < list[i].length; j++) {
      idCours = list[i][0];
      tr += `
      <td>${list[i][j]}</td>
      `;
    }
    tr += `
    <td><input type="button" value="Update" class="update" name='${idCours}' onclick=SetupdateTableCours(${idCours})></td>
    <td><input type="button" value="Delete" class="delete" name='${idCours}' onclick=deleteTableCours(${idCours})></td>
    </tr>`;
    tbody.innerHTML += tr;
  }
}
function filTableStudent(list) {
  var tb = document.getElementById("table_student");
  var tbody = tb.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    var tr = "<tr>";
    var idStudent = "";
    for (let j = 0; j < list[i].length; j++) {
      idStudent = list[i][0];
      tr += `
      <td>${list[i][j]}</td>
      `;
    }
    tr += `
    <td><input type="button" value="Update" class="update" name='${idStudent}' onclick=SetupdateTableStudent(${idStudent})></td>
    <td><input type="button" value="Delete" class="delete" name='${idStudent}' onclick=deleteTableStudent(${idStudent})></td>
    </tr>`;
    tbody.innerHTML += tr;
  }
}

function filTableAVG(list) {
  var tb = document.getElementById("table_avg");
  var tbody = tb.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  const studentAverages = {};

  // Aggregate grades and credits for each student
  list.forEach((student) => {
    const studentId = student[0];
    const studentName = student[1];
    const studentSurname = student[2];
    const finalGrade = parseFloat(student[6]);
    const courseId = student[3];

    const course = listCours.find((c) => c[1] === courseId);
    const courseCredits = course ? parseInt(course[2]) : 0;

    if (!studentAverages[studentSurname + "-" + studentName]) {
      studentAverages[studentSurname + "-" + studentName] = {
        name: studentName,
        surname: studentSurname,
        totalPoints: 0,
        totalCredits: 0,
      };
    }

    studentAverages[studentSurname + "-" + studentName].totalPoints +=
      finalGrade * courseCredits;
    studentAverages[studentSurname + "-" + studentName].totalCredits +=
      courseCredits;
  });
  console.log(studentAverages);
  // Generate table rows for GPA
  Object.keys(studentAverages).forEach((studentId) => {
    const data = studentAverages[studentId];
    const gpa = data.totalCredits
      ? (data.totalPoints / data.totalCredits).toFixed(2)
      : 0;

    const tr = `
      <tr>
        <td>${data.name}</td>
        <td>${data.surname}</td>
        <td>${gpa}</td>
      </tr>`;
    tbody.innerHTML += tr;
  });
}

function deleteTableStudent(StudentId) {
  const index = listStudent.findIndex(
    (student) => parseInt(student[0]) === parseInt(StudentId)
  );
  if (index !== -1) {
    listStudent.splice(index, 1);
    console.log(`Course with ID ${StudentId} has been deleted.`);
  } else {
    console.log(`Course with ID ${StudentId} not found.`);
  }
  filTableStudent(listStudent);
}
function deleteTableCours(courseId) {
  const index = listCours.findIndex(
    (course) => parseInt(course[0]) === parseInt(courseId)
  );
  console.log(listCours);
  console.log(index);
  if (index !== -1) {
    listCours.splice(index, 1);
    console.log(`Course with ID ${courseId} has been deleted.`);
  } else {
    console.log(`Course with ID ${courseId} not found.`);
  }
  filTableCours(listCours);
}
function SetupdateTableStudent(StudentID) {
  const index = listStudent.findIndex(
    (student) => parseInt(student[0]) === parseInt(StudentID)
  );
  document.getElementById("add_student").click();
  document.getElementById("add_std").value = "update";
  var form = document.getElementById("frmStudent");
  var values = form.getElementsByTagName("input");
  console.log(values);
  for (var i = 0; i < listStudent[index].length; i++) {
    values[i].value = listStudent[index][i];
  }
  document.getElementById("Cours").value = listStudent[index][3];
  document.getElementById("cr").value = listStudent[index][3];
  isStudentUpdate = true;
}

function updateTableStudent(student) {
  const index = listStudent.findIndex(
    (st) => parseInt(st[0]) === parseInt(student[0])
  );
  for (var i = 0; i < listStudent[index].length; i++) {
    listStudent[index][i] = student[i];
  }
  document.getElementById("list_student").click();
  isStudentUpdate = false;

  var form = document.getElementById("frmStudent");
  form.reset();
}
function SetupdateTableCours(courseId) {
  const index = listCours.findIndex(
    (course) => parseInt(course[0]) === parseInt(courseId)
  );
  document.getElementById("add_cours").click();
  document.getElementById("add_cr").value = "update";
  var form = document.getElementById("frmCours");
  var values = form.getElementsByTagName("input");
  console.log(values);
  for (var i = 0; i < listCours[index].length; i++) {
    values[i].value = listCours[index][i];
  }
  isCoursUpdate = true;
}
function updateTableCours(Cours) {
  const index = listCours.findIndex(
    (course) => parseInt(course[0]) === parseInt(Cours[0])
  );
  for (var i = 0; i < listCours[index].length; i++) {
    listCours[index][i] = Cours[i];
  }
  document.getElementById("list_cours").click();
  isCoursUpdate = false;

  var form = document.getElementById("frmCours");
  form.reset();
}
function updateTableStudent(Student) {
  const index = listStudent.findIndex(
    (Studente) => parseInt(Studente[0]) === parseInt(Student[0])
  );
  for (var i = 0; i < listStudent[index].length; i++) {
    listStudent[index][i] = Student[i];
  }
  document.getElementById("list_student").click();
  isStudentUpdate = false;

  var form = document.getElementById("frmStudent");
  form.reset();
}
document.getElementById("search").addEventListener("keydown", (e) => {
  // Get the value of the input field, including the currently pressed key
  const inputValue = e.target.value + (e.key.length === 1 ? e.key : "");

  // Filter the students based on the search value
  const student = listStudent.filter(
    (a) =>
      a[0]
        .toString()
        .toLocaleLowerCase()
        .includes(inputValue.toString().toLocaleLowerCase()) ||
      a[1].toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      a[2].toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      a[3].toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()) ||
      a[4]
        .toString()
        .toLocaleLowerCase()
        .includes(inputValue.toString().toLocaleLowerCase()) ||
      a[5]
        .toString()
        .toLocaleLowerCase()
        .includes(inputValue.toString().toLocaleLowerCase()) ||
      a[6]
        .toString()
        .toLocaleLowerCase()
        .includes(inputValue.toString().toLocaleLowerCase())
  );

  // Update the table with the filtered students
  filTableStudent(student);

  // If the input is empty, reset the table to show all students
  if (inputValue.trim() === "") {
    filTableStudent(listStudent);
  }

  console.log(inputValue); // Log the input value for debugging
});

// Handle click events outside the search input
window.addEventListener("click", () => {
  const search = document.getElementById("search");
  if (search.value.trim() === "") {
    filTableStudent(listStudent); // Reset the table if the search is empty
  }
});
