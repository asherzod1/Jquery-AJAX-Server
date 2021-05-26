let server = 'http://213.230.99.101:2027';
let editObject = null;

$(document).ready(function () {
    
    students();
    $('#addTutor').click(function () { 
        $('#exampleModal').modal("show")
    });

    $('#saveStudent').click(function(){
        studentSave();
        $('#tbody').html('');
        $('#exampleModal').modal("hide")
        modalClear();
    })
});

function students(){

    $.ajax({
        type: "GET",
        url: `${server}/api/admin/students`,
        data: "data",
        dataType: "json",
        success: function (res) {
            if(res){
                res.map(item =>{
                    $('#tbody').append(`<tr>
                    <td>${item.id}</td>
                    <td>${item.fullname}</td>
                    <td>${item.username}</td>
                    <td>
                        <a href="#" class="btn btn-success" onclick="editStudent(${item.id})"><i class="fa fa-edit"></i></a>
                        <a href="#" class="btn btn-danger" onclick="deleteStudent(${item.id})"><i class="fa fa-trash-o"></i></a>
                    </td>
                </tr>`);
                })
            }
        }
    });
}

function studentSave(){

    let fullname = $('#fullname').val();
    let username = $('#username').val();
    let password = $('#password').val();

    let objectSend = {
        fullname,
        username,
        password
    }

    if(editObject){
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            url: `${server}/api/admin/student/edit/${editObject.id}`,
            dataType: "json",
            data: JSON.stringify(objectSend),
            success: function (res) {
                if(res){
                    students();
                }
                else{
                    alert('Qaytadan tekshirib koring');
                }
            }
        });
    }
    else{
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: `${server}/api/admin/student/save`,
            data: JSON.stringify(objectSend),
            dataType: "json",
            success: function (res) {
                if(res){
                    students();
                }
                else{
                    alert('Server bilan xatolik');
                }
            }
        });
    }
}

function modalClear(){
    $('#fullname').val('');
    $('#username').val('');
    $('#address').val('');
    $('#password').val('');
}

function deleteStudent(id){

    $.ajax({
        type: "DELETE",
        url: `${server}/api/admin/student/delete/${id}`,
        data: "data",
        dataType: "json",
        success: function (res) {
            if(res && res.success){
                alert('Ochirildi');
                $('#tbody').html('');
                students();
            }
        }
    });
}

function editStudent(id){

    $.ajax({
        type: "GET",
        url: `${server}/api/admin/student/${id}`,
        data: "data",
        dataType: "json",
        success: function (res) {
            if(res){
                editObject = res;
                $('#exampleModal').modal("show");
                $('#fullname').val(res.fullname);
                $('#username').val(res.username);
                $('#password').val('1234');
            }
        }
    });
}
