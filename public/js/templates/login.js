function template_admin_login(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<form id=\"admin-login-form\"><div class=\"form-group\"><input type=\"text\" name=\"username\" placeholder=\"Username\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><input type=\"password\" name=\"password\" placeholder=\"Password\" required=\"required\" class=\"form-control\"/></div><button id=\"admin-login-button\" type=\"submit\" class=\"btn btn-lg btn-primary\">Log In</button></form>");;return buf.join("");
}