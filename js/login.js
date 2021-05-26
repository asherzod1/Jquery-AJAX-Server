let server = 'http://213.230.99.101:2027';
$(document).ready(function () {
    $('#login').click(function(){
        login();
    })
});

function login(){

    let username = $('#loginUsername').val();
    let password = $('#loginPassword').val();

    $.ajax({
        type: "GET",
        url: `${server}/api/admin/students`,
        data: "data",
        dataType: "json",
        success: function (res) {
                let u = res.find(item => item.username == username); 
                console.log(u)
                if(u){
                    console.log(username);
                    window.location.href = 'index.html';
                }
                else{
                    alert('Username yoki Parol xato');
                }
            
        }
    })
}