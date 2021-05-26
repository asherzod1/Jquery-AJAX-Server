let server = 'http://213.230.99.101:2027';
let editObject = null;
$(function () {
    
    group();
    $('#addTutor').click(function () { 
        $('#exampleModal').modal("show")
    });

    $('#saveTutor').click(function () { 
        saveGroup();
        $('#tbody').html('');
        $('#exampleModal').modal("hide")
        modalClear();
    });
    
});


function group(){
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${server}/api/admin/groups`,
        // data: "data",
        success: function (res) {
            if(Array.isArray(res)){
                res.map(item => {
                    $('#tbody').append(`<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>
                        <a href="#" class="btn btn-success" onclick="editGroup(${item.id})"><i class="fa fa-edit"></i></a>
                        <a href="#" class="btn btn-danger" onclick="deleteTutor(${item.id})"><i class="fa fa-trash-o"></i></a>
                    </td>
                </tr>`);
                })
                
            }
        }
        
    });
}

function saveGroup(){

    let name = $('#name').val();
    let objectSend = {
        name
    }
    if(editObject){
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${server}/api/admin/group/edit/${editObject.id}`,
            data: JSON.stringify(objectSend),
            success: function (res) {
                if(res){
                    group();
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
            url: `${server}/api/admin/group/save`,
            data: JSON.stringify(objectSend),
            success: function (res) {
                if(res){
                    group();
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
        url: `${server}/api/admin/group/delete/${id}`,
        success: function (res) {
            if(res && res.success){
                alert('Ochirildi');
                $('#tbody').html('');
                group();
            }
            else{
                alert('O\'chirilmadi')
            }
        }
    });
}

function editGroup(id){

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: `${server}/api/admin/group/${id}`,
        data: "data",
        success: function (res) {
            if(res){
                editObject = res;
                $('#exampleModal').modal("show");
                $('#name').val(res.name);
            }
        }
    });
}