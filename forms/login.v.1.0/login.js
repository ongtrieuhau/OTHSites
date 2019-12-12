function checkLogin() {
    document.getElementById("lblLogin").style = "display:none";
    document.getElementById("btnSignOut").style = "display:none";
    checkTokenLogin();
}
function checkTokenLogin() {
    var dataCookie = document.cookie;
    var isLogin = true;
    var username = getCookie('username');
    if (username === undefined)
        isLogin = false;
    if (isLogin == true) {
        var gtoken = getCookie('gtoken');
        if (gtoken === undefined)
            isLogin = false;
        if (isLogin) {
            $.get("https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" + gtoken,
                {},
                function (data, status) {
                    if (data && data.expires_in) {
                        $("#lblLogin").text('Xin chào, ' + username + '[' + data.expires_in + ']');
                    }
                    else {
                        isLogin = false;
                        $("#lblLogin").text('');
                        resetCookieLogin();
                    }
                });
        }
    }
    setLogin(isLogin);
}
function resetCookieLogin() {
    delCookieKey('username');
    delCookieKey('gtoken');
}
function delCookieKey(key){
    $.removeCookie(key+'_'+window.btoa(key));
}
function saveCookie(key, value) {
    $.cookie(key+'_'+window.btoa(key), window.btoa(value), { expires: 1 });
}
function getCookie(key) {
    var result;
    var value = $.cookie(key+'_'+window.btoa(key));
    if (value)
        result = window.atob(value);
    return result;
}
$(document).ready(function () {
    $("#btnSignIn").click(function () {
        var username = document.getElementById("inputMail").value;
        var user = window.btoa(username);
        var pass = window.btoa(document.getElementById("inputPassword").value);
        var input = window.btoa(user + ':' + pass);
        $.get("https://script.google.com/macros/s/AKfycbwEc5wRLVL3nf8FKE46drhQssdMuCPpQlqyerQX/exec",
            { 'Input': input },
            function (data, status) {
                if (data && data.StatusCode && data.StatusCode == 'OK') {
                    saveCookie('username', username);
                    saveCookie('gtoken', data.Output);
                    checkTokenLogin();
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
        resetCookieLogin();
    });
});
function setLogin(islogin) {
    var showElement = "display:show";
    var hideElement = "display:none";
    var inputs = ["inputMail", "inputPassword", "icon-mail", "icon-pass", "btnSignIn"];
    var outputs = ["lblLogin", "btnSignOut"];
    for (var i = 0, ilen = inputs.length; i < ilen; i++) {
        var el = document.getElementById(inputs[i]);
        if (el) {
            if (islogin)
                el.style = hideElement;
            else
                el.style = showElement;
        }
    }
    for (var i = 0, ilen = outputs.length; i < ilen; i++) {
        var el = document.getElementById(outputs[i]);
        if (el) {
            if (islogin)
                el.style = showElement;
            else
                el.style = hideElement;
        }
    }
}