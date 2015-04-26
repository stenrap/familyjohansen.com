function template_admin_login(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<form id=\"admin-login-form\"><div class=\"form-group\"><input type=\"text\" name=\"username\" placeholder=\"Username\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><input type=\"password\" name=\"password\" placeholder=\"Password\" required=\"required\" class=\"form-control\"/></div><button id=\"admin-login-button\" type=\"submit\" data-style=\"slide-down\" class=\"btn btn-lg btn-primary ladda-button\"><span class=\"ladda-label\">Log In</span></button><button id=\"login-help\" type=\"button\" class=\"btn btn-lg btn-primary\">Help</button></form>");;return buf.join("");
}

function template_admin_help(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<form id=\"admin-help-form\"><div class=\"form-group\"><input type=\"email\" name=\"email\" placeholder=\"Email Address\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/></div><button id=\"admin-help-button\" type=\"submit\" data-style=\"slide-down\" class=\"btn btn-lg btn-primary ladda-button\"><span class=\"ladda-label\">Reset Password</span></button></form>");;return buf.join("");
}

function template_admin_reset(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<form id=\"admin-reset-form\"><div class=\"form-group\"><input type=\"password\" name=\"password1\" placeholder=\"New Password\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/></div><div class=\"form-group\"><input type=\"password\" name=\"password2\" placeholder=\"Again\" required=\"required\" class=\"form-control\"/><input type=\"hidden\" name=\"token\" class=\"form-control\"/></div><button id=\"admin-reset-button\" type=\"submit\" data-style=\"slide-down\" class=\"btn btn-lg btn-primary ladda-button\"><span class=\"ladda-label\">Submit</span></button></form>");;return buf.join("");
}

function template_admin_posts(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<button id=\"new-post\" type=\"button\" class=\"btn btn-lg btn-primary ladda-button\">Add New Post</button><table class=\"table table-striped\"><thead><tr><th>Title</th><th>Author</th><th>Tags</th><th>Date&nbsp;<span class=\"glyphicon glyphicon-triangle-bottom\"></span></th><th>Published</th><th>&nbsp;</th></tr></thead></table>");;return buf.join("");
}

function template_admin_editPost(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div id=\"edit-post-container\"><form id=\"edit-post-form\"><div id=\"edit-post-form-left\"><div class=\"form-group\"><input type=\"text\" name=\"title\" placeholder=\"Post Title\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/><div id=\"format-buttons\"><!-- WYLO .... Get this box visible, then start on the #editor! --></div><div id=\"editor\"></div></div></div><div id=\"edit-post-form-right\"><div id=\"featured-box\" class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\">Featured</h4></div><div class=\"panel-body\"><div role=\"tabpanel\"><ul role=\"tablist\" class=\"nav nav-tabs\"><li role=\"presentation\" class=\"active\"><a href=\"#image\" aria-controls=\"image\" role=\"tab\" data-toggle=\"tab\" class=\"tab-name\">Image</a></li><li role=\"presentation\"><a href=\"#video\" aria-controls=\"video\" role=\"tab\" data-toggle=\"tab\" class=\"tab-name\">Video</a></li></ul><div class=\"tab-content\"><div id=\"image\" role=\"tabpanel\" class=\"tab-pane active\"></div><div id=\"video\" role=\"tabpanel\" class=\"tab-pane\"></div></div></div></div></div><div id=\"status-box\"></div></div></form></div>");;return buf.join("");
}

