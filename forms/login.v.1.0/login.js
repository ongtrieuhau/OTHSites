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
                    $("#lblLogin").text('Xin chào, ' + window.atob(user));
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
    $("#btnSignOut").click(function () {
        $("#lblLogin").text('Xin chào, ');
        $("#inputMail").val('');
        $("#inputPassword").val('');
        setLogin(false);
    });
});
function setLogin(islogin) {
    var showElement = "display:show";
    var hideElement = "display:none";
    var inputs = ["inputMail", "inputPassword", "icon-mail", "icon-pass", "btnSignIn"];
    var outputs = ["lblLogin", "btnSignOut"];
    for (var i = 0, ilen = inputs.length; i < ilen; i++) {
        var el = document.getElementById(inputs[i]);
        if (islogin)
            el.style = hideElement;
        else
            el.style = showElement;
    }
    for (var i = 0, ilen = outputs.length; i < ilen; i++) {
        var el = document.getElementById(outputs[i]);
        if (islogin)
            el.style = showElement;
        else
            el.style = hideElement;
    }
}