/* =========================================
   COLLEGE BACKLOG SUPPORT SYSTEM
========================================= */

let currentUser = "teacher";


/* =========================================
   ELEMENTS
========================================= */

const loginPage = document.getElementById("loginPage");

const teacherApp = document.getElementById("teacherApp");

const studentApp = document.getElementById("studentApp");

const loginForm = document.getElementById("loginForm");

const switchLogin = document.getElementById("switchLogin");

const loginTitle = document.getElementById("loginTitle");

const loginSubtitle = document.getElementById("loginSubtitle");

const loginButton = document.getElementById("loginButton");

const idLabel = document.getElementById("idLabel");

const loginId = document.getElementById("loginId");

const loginBanner = document.getElementById("loginBanner");

const teacherContent =
    document.getElementById("teacherContent");

const studentContent =
    document.getElementById("studentContent");

const teacherPageTitle =
    document.getElementById("teacherPageTitle");

const studentPageTitle =
    document.getElementById("studentPageTitle");


/* =========================================
   LOGIN TYPE SWITCH
========================================= */

switchLogin.addEventListener("click", () => {

    if (currentUser === "teacher") {

        currentUser = "student";

        loginTitle.textContent = "Student Login";

        loginSubtitle.textContent =
            "Login to track your backlog progress";

        idLabel.textContent =
            "Roll Number / Student ID";

        loginId.placeholder =
            "Enter your Roll Number";

        loginButton.textContent =
            "Login as Student";

        loginButton.classList.add("student-btn");

        loginBanner.classList.add("student-theme");

        switchLogin.textContent =
            "Login as Teacher";

        document.querySelector(".login-icon")
            .textContent = "👨‍🎓";

    } else {

        currentUser = "teacher";

        loginTitle.textContent =
            "Teacher Login";

        loginSubtitle.textContent =
            "Login to manage backlog students";

        idLabel.textContent =
            "Teacher ID / Email";

        loginId.placeholder =
            "Enter Teacher ID";

        loginButton.textContent =
            "Login as Teacher";

        loginButton.classList.remove("student-btn");

        loginBanner.classList.remove("student-theme");

        switchLogin.textContent =
            "Login as Student";

        document.querySelector(".login-icon")
            .textContent = "👨‍🏫";
    }

});


/* =========================================
   LOGIN
========================================= */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    loginPage.style.display = "none";

    if (currentUser === "teacher") {

        teacherApp.style.display = "block";

        studentApp.style.display = "none";

        loadTeacherPage("teacherDashboard");

    } else {

        studentApp.style.display = "block";

        teacherApp.style.display = "none";

        loadStudentPage("studentDashboard");

    }

});


/* =========================================
   LOGOUT
========================================= */

document.querySelectorAll(".logout-btn")
    .forEach(button => {

        button.addEventListener("click", logout);

    });


function logout() {

    teacherApp.style.display = "none";

    studentApp.style.display = "none";

    loginPage.style.display = "flex";

    loginForm.reset();

}


/* =========================================
   TEACHER NAVIGATION
========================================= */

document.querySelectorAll("#teacherApp .nav-item")
    .forEach(button => {

        if (button.classList.contains("logout-btn")) {
            return;
        }

        button.addEventListener("click", () => {

            const page =
                button.getAttribute("data-page");

            loadTeacherPage(page);

            document
                .querySelectorAll("#teacherApp .nav-item")
                .forEach(item => {

                    item.classList.remove("active");

                });

            button.classList.add("active");

        });

    });


/* =========================================
   STUDENT NAVIGATION
========================================= */

document.querySelectorAll("#studentApp .nav-item")
    .forEach(button => {

        if (button.classList.contains("logout-btn")) {
            return;
        }

        button.addEventListener("click", () => {

            const page =
                button.getAttribute("data-page");

            loadStudentPage(page);

            document
                .querySelectorAll("#studentApp .nav-item")
                .forEach(item => {

                    item.classList.remove("active");

                });

            button.classList.add("active");

        });

    });


/* =========================================
   TEACHER PAGE LOADER
========================================= */

function loadTeacherPage(page) {

    const pages = {

        teacherDashboard: teacherDashboard(),

        backlogStudents: backlogStudents(),

        attendance: attendancePage(),

        performance: performancePage(),

        results: resultsPage(),

        classes: classesPage(),

        timetable: timetablePage(),

        internal: internalPage(),

        statistics: teacherStatistics(),

        notifications: notificationsPage(),

        profile: teacherProfile()

    };


    teacherContent.innerHTML =
        pages[page] || teacherDashboard();

    updateTeacherTitle(page);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   STUDENT PAGE LOADER
========================================= */

function loadStudentPage(page) {

    const pages = {

        studentDashboard: studentDashboard(),

        studentClasses: studentClasses(),

        studentAttendance: studentAttendance(),

        studentPerformance: studentPerformance(),

        studentResults: studentResults(),

        studentTimetable: studentTimetable(),

        studentInternal: studentInternal(),

        studentStatistics: studentStatistics(),

        studentNotifications: studentNotifications(),

        studentProfile: studentProfile()

    };


    studentContent.innerHTML =
        pages[page] || studentDashboard();

    updateStudentTitle(page);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   TEACHER TITLES
========================================= */

function updateTeacherTitle(page) {

    const titles = {

        teacherDashboard: "Teacher Dashboard",

        backlogStudents: "Backlog Students",

        attendance: "Attendance Management",

        performance: "Student Performance",

        results: "Results & Marks",

        classes: "Classes & Schedule",

        timetable: "Exam Timetable",

        internal: "Internal Marks",

        statistics: "Student Statistics",

        notifications: "Notifications",

        profile: "Teacher Profile"

    };

    teacherPageTitle.textContent =
        titles[page] || "Teacher Dashboard";

}


/* =========================================
   STUDENT TITLES
========================================= */

function updateStudentTitle(page) {

    const titles = {

        studentDashboard: "Student Dashboard",

        studentClasses: "Assigned Classes",

        studentAttendance: "My Attendance",

        studentPerformance: "My Performance",

        studentResults: "Results & Marks",

        studentTimetable: "Exam Timetable",

        studentInternal: "Internal Marks",

        studentStatistics: "My Statistics",

        studentNotifications: "Notifications",

        studentProfile: "My Profile"

    };

    studentPageTitle.textContent =
        titles[page] || "Student Dashboard";

}


/* =========================================
   TEACHER DASHBOARD
========================================= */

function teacherDashboard() {

    return `

        <div class="cards">

            ${card("Backlog Students", "48", "blue")}

            ${card("Assigned Classes", "12", "purple")}

            ${card("Pending Attendance", "05", "orange")}

            ${card("Students At Risk", "08", "red")}

        </div>


        <div class="content-grid">

            <div class="section">

                <h2 class="section-title">
                    Backlog Students
                </h2>

                ${studentTable()}

            </div>


            <div class="section">

                <h2 class="section-title">
                    Upcoming Classes
                </h2>

                <div class="notification">

                    <b>DBMS</b>

                    <p>
                        Tomorrow • 10:00 AM
                    </p>

                </div>

                <div class="notification">

                    <b>Computer Networks</b>

                    <p>
                        Friday • 12:00 PM
                    </p>

                </div>

            </div>

        </div>

    `;

}


/* =========================================
   BACKLOG STUDENTS
========================================= */

function backlogStudents() {

    return `

        <div class="section">

            <h2 class="section-title">
                Students With Backlog
            </h2>

            ${studentTable(true)}

        </div>

    `;

}


/* =========================================
   STUDENT TABLE
========================================= */

function studentTable(full = false) {

    return `

        <div class="table-container">

            <table>

                <thead>

                    <tr>

                        <th>Student</th>

                        <th>Roll Number</th>

                        <th>Subject</th>

                        <th>Attendance</th>

                        <th>Performance</th>

                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td>Arnav Sarraf</td>

                        <td>2402920100041</td>

                        <td>DBMS</td>

                        <td>82%</td>

                        <td>76%</td>

                        <td>
                            <span class="badge warning">
                                In Progress
                            </span>
                        </td>

                    </tr>


                    <tr>

                        <td>Rahul Singh</td>

                        <td>240292010012</td>

                        <td>COA</td>

                        <td>65%</td>

                        <td>51%</td>

                        <td>
                            <span class="badge danger">
                                At Risk
                            </span>
                        </td>

                    </tr>


                    <tr>

                        <td>Priya Sharma</td>

                        <td>240292010025</td>

                        <td>Mathematics</td>

                        <td>91%</td>

                        <td>84%</td>

                        <td>
                            <span class="badge success">
                                Good
                            </span>
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    `;

}


/* =========================================
   ATTENDANCE
========================================= */

function attendancePage() {

    return `

        <div class="cards">

            ${card("Total Students", "48", "blue")}

            ${card("Average Attendance", "81%", "green")}

            ${card("Low Attendance", "07", "orange")}

            ${card("Classes Conducted", "32", "purple")}

        </div>


        <div class="section">

            <h2 class="section-title">
                Attendance Records
            </h2>

            <table>

                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Total Classes</th>
                    <th>Attended</th>
                    <th>Attendance</th>
                </tr>

                <tr>
                    <td>Arnav Sarraf</td>
                    <td>DBMS</td>
                    <td>20</td>
                    <td>17</td>
                    <td>85%</td>
                </tr>

                <tr>
                    <td>Rahul Singh</td>
                    <td>COA</td>
                    <td>20</td>
                    <td>13</td>
                    <td>65%</td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   PERFORMANCE
========================================= */

function performancePage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Student Performance
            </h2>

            <table>

                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Quiz</th>
                    <th>Assignment</th>
                    <th>Test</th>
                    <th>Overall</th>
                </tr>

                <tr>
                    <td>Arnav Sarraf</td>
                    <td>DBMS</td>
                    <td>18/20</td>
                    <td>17/20</td>
                    <td>38/50</td>
                    <td>76%</td>
                </tr>

                <tr>
                    <td>Rahul Singh</td>
                    <td>COA</td>
                    <td>12/20</td>
                    <td>14/20</td>
                    <td>25/50</td>
                    <td>51%</td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   RESULTS
========================================= */

function resultsPage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Results & Marks
            </h2>

            <table>

                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Internal</th>
                    <th>External</th>
                    <th>Total</th>
                    <th>Result</th>
                </tr>

                <tr>
                    <td>Arnav Sarraf</td>
                    <td>DBMS</td>
                    <td>24</td>
                    <td>48</td>
                    <td>72</td>
                    <td>
                        <span class="badge success">
                            Pass
                        </span>
                    </td>
                </tr>

                <tr>
                    <td>Rahul Singh</td>
                    <td>COA</td>
                    <td>18</td>
                    <td>31</td>
                    <td>49</td>
                    <td>
                        <span class="badge danger">
                            Fail
                        </span>
                    </td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   CLASSES
========================================= */

function classesPage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Backlog Classes
            </h2>

            <table>

                <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Students</th>
                </tr>

                <tr>
                    <td>DBMS</td>
                    <td>22 Aug 2026</td>
                    <td>10:00 AM</td>
                    <td>Lab 2</td>
                    <td>25</td>
                </tr>

                <tr>
                    <td>COA</td>
                    <td>24 Aug 2026</td>
                    <td>12:00 PM</td>
                    <td>Room 304</td>
                    <td>18</td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   TIMETABLE
========================================= */

function timetablePage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Backlog Exam Timetable
            </h2>

            <table>

                <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Room</th>
                </tr>

                <tr>
                    <td>DBMS</td>
                    <td>30 Aug 2026</td>
                    <td>10:00 AM</td>
                    <td>Hall 1</td>
                </tr>

                <tr>
                    <td>COA</td>
                    <td>02 Sep 2026</td>
                    <td>02:00 PM</td>
                    <td>Hall 2</td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   INTERNAL MARKS
========================================= */

function internalPage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Internal / Test Marks
            </h2>

            <table>

                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Test 1</th>
                    <th>Test 2</th>
                    <th>Assignment</th>
                    <th>Total</th>
                </tr>

                <tr>
                    <td>Arnav Sarraf</td>
                    <td>DBMS</td>
                    <td>18</td>
                    <td>17</td>
                    <td>9</td>
                    <td>44/50</td>
                </tr>

            </table>

        </div>

    `;

}


/* =========================================
   TEACHER STATISTICS
========================================= */

function teacherStatistics() {

    return `

        <div class="cards">

            ${card("Total Students", "48", "blue")}

            ${card("Subjects Cleared", "21", "green")}

            ${card("In Progress", "19", "orange")}

            ${card("At Risk", "08", "red")}

        </div>


        <div class="section">

            <h2 class="section-title">
                Overall Backlog Progress
            </h2>

            <p>
                Student progress
            </p>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:68%"
                ></div>

            </div>

            <p style="margin-top:10px">
                68% students are progressing successfully.
            </p>

        </div>

    `;

}


/* =========================================
   NOTIFICATIONS
========================================= */

function notificationsPage() {

    return `

        <div class="section">

            <h2 class="section-title">
                Notifications
            </h2>

            <div class="notification">

                <div class="notification-title">
                    🔔 New DBMS backlog class assigned
                </div>

                <div class="notification-time">
                    Today, 10:30 AM
                </div>

            </div>


            <div class="notification">

                <div class="notification-title">
                    📋 Attendance needs to be updated
                </div>

                <div class="notification-time">
                    Yesterday
                </div>

            </div>


            <div class="notification">

                <div class="notification-title">
                    📝 Internal marks submission pending
                </div>

                <div class="notification-time">
                    2 days ago
                </div>

            </div>

        </div>

    `;

}


/* =========================================
   TEACHER PROFILE
========================================= */

function teacherProfile() {

    return `

        <div class="section">

            <div class="profile-card">

                <div class="profile-avatar">
                    RK
                </div>

                <div>

                    <h2>
                        Dr. Rahul Kumar
                    </h2>

                    <p>
                        Teacher • Computer Science
                    </p>

                </div>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Teacher ID
                </span>

                <strong>TCH1024</strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Department
                </span>

                <strong>Computer Science</strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Subject
                </span>

                <strong>DBMS</strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Section
                </span>

                <strong>A</strong>

            </div>

        </div>

    `;

}


/* =========================================
   STUDENT DASHBOARD
========================================= */

function studentDashboard() {

    return `

        <div class="cards">

            ${card("Backlog Subjects", "2", "purple")}

            ${card("Attendance", "82%", "green")}

            ${card("Average Performance", "76%", "blue")}

            ${card("Backlog Progress", "65%", "orange")}

        </div>


        <div class="content-grid">

            <div class="section">

                <h2 class="section-title">
                    My Backlog Subjects
                </h2>

                <p>
                    Database Management System
                </p>

                <div class="progress">

                    <div
                        class="progress-bar progress-purple"
                        style="width:76%"
                    ></div>

                </div>

                <p style="margin:8px 0 20px">
                    Performance: 76%
                </p>


                <p>
                    Computer Organization
                </p>

                <div class="progress">

                    <div
                        class="progress-bar progress-purple"
                        style="width:61%"
                    ></div>

                </div>

                <p style="margin-top:8px">
                    Performance: 61%
                </p>

            </div>


            <div class="section">

                <h2 class="section-title">
                    Upcoming
                </h2>

                <div class="notification">

                    <b>DBMS Class</b>

                    <p>
                        Tomorrow • 10:00 AM
                    </p>

                </div>

                <div class="notification">

                    <b>DBMS Backlog Exam</b>

                    <p>
                        30 Aug 2026
                    </p>

                </div>

            </div>

        </div>

    `;

}


/* =========================================
   STUDENT CLASSES
========================================= */

function studentClasses() {

    return studentTablePage(
        "Assigned Classes",
        `
        <tr>
            <th>Subject</th>
            <th>Teacher</th>
            <th>Date</th>
            <th>Time</th>
            <th>Room</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>Dr. Rahul Kumar</td>
            <td>22 Aug</td>
            <td>10:00 AM</td>
            <td>Lab 2</td>
        </tr>

        <tr>
            <td>COA</td>
            <td>Dr. Amit Sharma</td>
            <td>24 Aug</td>
            <td>12:00 PM</td>
            <td>Room 304</td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT ATTENDANCE
========================================= */

function studentAttendance() {

    return studentTablePage(
        "My Attendance",
        `
        <tr>
            <th>Subject</th>
            <th>Total Classes</th>
            <th>Attended</th>
            <th>Missed</th>
            <th>Attendance</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>20</td>
            <td>17</td>
            <td>3</td>
            <td>85%</td>
        </tr>

        <tr>
            <td>COA</td>
            <td>20</td>
            <td>15</td>
            <td>5</td>
            <td>75%</td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT PERFORMANCE
========================================= */

function studentPerformance() {

    return studentTablePage(
        "My Performance",
        `
        <tr>
            <th>Subject</th>
            <th>Quiz</th>
            <th>Assignment</th>
            <th>Test</th>
            <th>Overall</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>18/20</td>
            <td>17/20</td>
            <td>38/50</td>
            <td>76%</td>
        </tr>

        <tr>
            <td>COA</td>
            <td>15/20</td>
            <td>16/20</td>
            <td>30/50</td>
            <td>61%</td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT RESULTS
========================================= */

function studentResults() {

    return studentTablePage(
        "Results & Marks",
        `
        <tr>
            <th>Subject</th>
            <th>Internal</th>
            <th>External</th>
            <th>Total</th>
            <th>Result</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>24</td>
            <td>48</td>
            <td>72</td>
            <td>
                <span class="badge success">
                    Pass
                </span>
            </td>
        </tr>

        <tr>
            <td>COA</td>
            <td>18</td>
            <td>31</td>
            <td>49</td>
            <td>
                <span class="badge danger">
                    Fail
                </span>
            </td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT TIMETABLE
========================================= */

function studentTimetable() {

    return studentTablePage(
        "Exam Timetable",
        `
        <tr>
            <th>Subject</th>
            <th>Date</th>
            <th>Time</th>
            <th>Room</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>30 Aug 2026</td>
            <td>10:00 AM</td>
            <td>Hall 1</td>
        </tr>

        <tr>
            <td>COA</td>
            <td>02 Sep 2026</td>
            <td>02:00 PM</td>
            <td>Hall 2</td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT INTERNAL MARKS
========================================= */

function studentInternal() {

    return studentTablePage(
        "Internal Marks",
        `
        <tr>
            <th>Subject</th>
            <th>Test 1</th>
            <th>Test 2</th>
            <th>Assignment</th>
            <th>Total</th>
        </tr>

        <tr>
            <td>DBMS</td>
            <td>18</td>
            <td>17</td>
            <td>9</td>
            <td>44/50</td>
        </tr>

        <tr>
            <td>COA</td>
            <td>15</td>
            <td>14</td>
            <td>8</td>
            <td>37/50</td>
        </tr>
        `
    );

}


/* =========================================
   STUDENT STATISTICS
========================================= */

function studentStatistics() {

    return `

        <div class="cards">

            ${card("Backlog Subjects", "2", "purple")}

            ${card("Subjects Cleared", "1", "green")}

            ${card("Attendance", "82%", "blue")}

            ${card("Average Marks", "72%", "orange")}

        </div>


        <div class="section">

            <h2 class="section-title">
                Overall Backlog Progress
            </h2>

            <p>
                Your preparation progress
            </p>

            <div class="progress">

                <div
                    class="progress-bar progress-purple"
                    style="width:65%"
                ></div>

            </div>

            <p style="margin-top:10px">
                You have completed
                <strong>65%</strong>
                of your backlog preparation.
            </p>

        </div>

    `;

}


/* =========================================
   STUDENT NOTIFICATIONS
========================================= */

function studentNotifications() {

    return `

        <div class="section">

            <h2 class="section-title">
                Notifications
            </h2>

            <div class="notification">

                <div class="notification-title">
                    🔔 New DBMS class scheduled
                </div>

                <div class="notification-time">
                    Today
                </div>

            </div>


            <div class="notification">

                <div class="notification-title">
                    📋 Attendance updated
                </div>

                <div class="notification-time">
                    Yesterday
                </div>

            </div>


            <div class="notification">

                <div class="notification-title">
                    📝 Internal marks published
                </div>

                <div class="notification-time">
                    2 days ago
                </div>

            </div>

        </div>

    `;

}


/* =========================================
   STUDENT PROFILE
========================================= */

function studentProfile() {

    return `

        <div class="section">

            <div class="profile-card">

                <div class="profile-avatar"
                     style="background:#6250d2">

                    AS

                </div>

                <div>

                    <h2>
                        Arnav Sarraf
                    </h2>

                    <p>
                        Computer Science Engineering
                    </p>

                </div>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Roll Number
                </span>

                <strong>
                    2402920100041
                </strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Branch
                </span>

                <strong>
                    Computer Science Engineering
                </strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Semester
                </span>

                <strong>
                    4th Semester
                </strong>

            </div>


            <div class="profile-row">

                <span class="profile-label">
                    Section
                </span>

                <strong>
                    A
                </strong>

            </div>

        </div>

    `;

}


/* =========================================
   HELPER FUNCTIONS
========================================= */

function card(title, number, color) {

    return `

        <div class="card">

            <div class="card-title">
                ${title}
            </div>

            <div class="card-number ${color}">
                ${number}
            </div>

        </div>

    `;

}


function studentTablePage(title, rows) {

    return `

        <div class="section">

            <h2 class="section-title">
                ${title}
            </h2>

            <div class="table-container">

                <table>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}