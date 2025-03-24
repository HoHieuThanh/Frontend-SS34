const formE = document.querySelector("form");
const contentInputE = document.getElementById("content");
const dateInputE = document.getElementById("due-date");
const statusInputE = document.getElementById("chosse-status");
const nameInputE = document.getElementById("name");
const tbodyE = document.querySelector("tbody");

let courses = JSON.parse(localStorage.getItem("course")) || [];
let editingId = null; //biến lưu trạng thái chỉnh sửa

//hiển thị danh sách
function renderCourses() {
    tbodyE.innerHTML = "";
    courses.forEach((course, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${course.content}</td>
            <td>${course.dueDate}</td>
            <td>${course.status}</td>
            <td>${course.assignedTo}</td>
            <td><button class="btn-action" onclick="editCourse(${course.id})">Sửa</button></td>
            <td><button class="btn-action" onclick="deleteCourse(${course.id})">Xóa</button></td>
        `;

        tbodyE.appendChild(tr);
    });
}

// Lưu vào Local Storage
function saveToLocalStorage() {
    localStorage.setItem("course", JSON.stringify(courses));
}

// Xử lý thêm hoặc cập nhật course
formE.addEventListener("submit", e => {
    e.preventDefault();

    const contentValue = contentInputE.value.trim();
    if (!contentValue) {
        alert("Nội dung không được để trống");
        return;
    }

    const dateValue = dateInputE.value;
    if (!dateValue) {
        alert("Vui lòng chọn thời gian");
        return;
    }

    const statusValue = statusInputE.value;
    if (!statusValue) {
        alert("Vui lòng chọn trạng thái");
        return;
    }

    const nameValue = nameInputE.value.trim();
    if (!nameValue) {
        alert("Vui lòng nhập người phụ trách");
        return;
    }

    if (editingId) {
        // Cập nhật course
        const index = courses.findIndex(course => course.id === editingId);
        if (index !== -1) {
            courses[index] = {
                id: editingId,
                content: contentValue,
                dueDate: dateValue,
                status: statusValue,
                assignedTo: nameValue
            };
            editingId = null; // reset sau khi sửa
            alert("Đã cập nhật thành công!");
        }
    } else {
        // Thêm course mới
        const newCourse = {
            id: courses.length > 0 ? courses[courses.length - 1].id + 1 : 1,
            content: contentValue,
            dueDate: dateValue,
            status: statusValue,
            assignedTo: nameValue
        };
        courses.push(newCourse);
        alert("Đã thêm đầu việc thành công!");
    }

    saveToLocalStorage();
    renderCourses();
    formE.reset();
    statusInputE.value = "";
});

// Sửa course
function editCourse(id) {
    const course = courses.find(course => course.id === id);
    if (!course) return;

    editingId = id;

    contentInputE.value = course.content;
    dateInputE.value = course.dueDate;
    statusInputE.value = course.status;
    nameInputE.value = course.assignedTo;
}

// Xóa course
function deleteCourse(id) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa không?");
    if (!confirmDelete) return;

    courses = courses.filter(course => course.id !== id);
    saveToLocalStorage();
    renderCourses();
}

renderCourses();
