function checkLogin() {
    document.getElementById("lblLogin").style = "display:none";
    document.getElementById("btnSignOut").style = "display:none";
    //alert("Page is loaded");
    //document.getElementById("btnSignOut").style = "display:show";
}
$(document).ready(function () {
    $("#btnSignIn").click(function () {
        var user = window.btoa(document.getElementById("inputMail").value);
        var pass = window.btoa(document.getElementById("inputPassword").value);
        var input = window.btoa(user + ':' + pass);
        $.get("https://script.google.com/macros/s/AKfycbwEc5wRLVL3nf8FKE46drhQssdMuCPpQlqyerQX/exec",
            { 'Input': input },
            function (data, status) {
                if (data && data.StatusCode && data.StatusCode == 'OK') {
                    $("#inputMail").val(JSON.stringify(data.Output, null, '\t'));
                    $("#lblLogin").val('Xin chào, '+user);
                    setLogin(true);
                }
                else if (data && data.Error && data.Error != '') {
                    alert(data.Error);
                    setLogin(false);
                }
                else {
                    $("#inputMail").val("Data: " + JSON.stringify(data, null, '\t') + "\nStatus: " + new Date() + JSON.stringify(status, null, '\t'));
                    setLogin(false);
                }
            });
    });
});
function setLogin(islogin){
    if(islogin==true){
        document.getElementById("lblLogin").style = "display:show";
        document.getElementById("btnSignOut").style = "display:show";
        
        document.getElementById("inputMail").style = "display:none"; 
        document.getElementById("icon-mail").style = "display:none"; 
        document.getElementById("icon-pass").style = "display:none"; 
        document.getElementById("inputPassword").style = "display:none"; 
        document.getElementById("btnSignIn").style = "display:none";
    }
    else{
        document.getElementById("lblLogin").style = "display:show";
        document.getElementById("btnSignOut").style = "display:show";
        
        document.getElementById("inputMail").style = "display:none"; 
        document.getElementById("inputPassword").style = "display:none"; 
        document.getElementById("btnSignIn").style = "display:none";
        document.getElementById("icon-mail").style = "display:show"; 
        document.getElementById("icon-pass").style = "display:show";
    }
}