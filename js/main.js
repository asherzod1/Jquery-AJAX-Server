let server = 'http://213.230.99.101:2027';
let editObject = null;
$(function () {
    
    tutor();
    $('#addTutor').click(function () { 
        $('#exampleModal').modal("show")
    });

    $('#saveTutor').click(function () { 
        saveTutor();
        $('#tbody').html('');
        $('#exampleModal').modal("hide")
        modalClear();
    });
    
});


function tutor(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${server}/api/admin/tutors`,
        // data: "data",
        success: function (res) {
            if(Array.isArray(res)){
                res.map(item => {
                    $('#tbody').append(`<tr>
                    <td>${item.id}</td>
                    <td>${item.fullname}</td>
                    <td>${item.username}</td>
                    <td>${item.address}</td>
                    <td>
                        <a href="#" class="btn btn-success" onclick="editTutor(${item.id})"><i class="fa fa-edit"></i></a>
                        <a href="#" class="btn btn-danger" onclick="deleteTutor(${item.id})"><i class="fa fa-trash-o"></i></a>
                    </td>
                </tr>`);
                })
                
            }
        }
        
    });
}

function saveTutor(){

    let fullname = $('#fullname').val();
    let username = $('#username').val();
    let address = $('#address').val();
    let password = $('#password').val();

    let objectSend = {
        fullname,
        username,
        address,
        password
    }
    if(editObject){
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${server}/api/admin/tutor/edit/${editObject.id}`,
            data: JSON.stringify(objectSend),
            success: function (res) {
                if(res){
                    tutor();
                }
                else{
                    alert('Qaytadan tekshirib koring')
                }
            }
        });
    }
    else{
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${server}/api/admin/tutor/save`,
            data: JSON.stringify(objectSend),
            success: function (res) {
                if(res){
                    tutor();
                }
                else{
                    alert('Server bilan Xatolik')
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

function deleteTutor(id){

    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${server}/api/admin/tutor/delete/${id}`,
        success: function (res) {
            if(res && res.success){
                alert('Ochirildi');
                $('#tbody').html('');
                tutor();
            }
            else{
                alert('O\'chirilmadi')
            }
        }
    });
}

function editTutor(id){

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${server}/api/admin/tutor/${id}`,
        data: "data",
        success: function (res) {
            if(res){
                editObject = res;
                $('#exampleModal').modal("show");
                $('#fullname').val(res.fullname);
                $('#username').val(res.username);
                $('#address').val(res.address);
                $('#password').val('12345');
            }
        }
    });
}