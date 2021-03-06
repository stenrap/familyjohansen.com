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

buf.push("<div id=\"edit-post-container\"><form id=\"edit-post-form\"><div id=\"edit-post-form-left\"><div class=\"form-group\"><input type=\"text\" name=\"title\" placeholder=\"Post Title\" autofocus=\"autofocus\" required=\"required\" class=\"form-control\"/><div id=\"format-buttons\"><div class=\"dropdown\"><button id=\"font-size\" type=\"button\" data-toggle=\"dropdown\" aria-expanded=\"true\" class=\"btn btn-default dropdown-toggle\">Paragraph &nbsp;<span class=\"caret\"></span></button><ul role=\"menu\" aria-labelledby=\"font-size\" class=\"dropdown-menu\"><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" data-size=\"0\" class=\"font-size\">Paragraph</a></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" data-size=\"4\" class=\"font-size\"><h4>Heading 4</h4></a></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" data-size=\"3\" class=\"font-size\"><h3>Heading 3</h3></a></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" data-size=\"2\" class=\"font-size\"><h2>Heading 2</h2></a></li><li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"javascript:void(0)\" data-size=\"1\" class=\"font-size\"><h1>Heading 1</h1></a></li></ul></div><a id=\"bold\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Bold\" class=\"btn btn-default\"><i class=\"fa fa-bold\"></i></a><a id=\"italic\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Italic\" class=\"btn btn-default\"><i class=\"fa fa-italic\"></i></a><a id=\"underline\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Underline\" class=\"btn btn-default\"><i class=\"fa fa-underline\"></i></a><a id=\"strike\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Strikethrough\" class=\"btn btn-default\"><i class=\"fa fa-strikethrough\"></i></a><a id=\"unordered-list\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Bulleted List\" class=\"btn btn-default\"><i class=\"fa fa-list-ul\"></i></a><a id=\"ordered-list\" type=\"button\" aria-pressed=\"false\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Numbered List\" class=\"btn btn-default\"><i class=\"fa fa-list-ol\"></i></a></div><div id=\"editor\" contenteditable=\"true\"></div></div></div><div id=\"edit-post-form-right\"><div id=\"featured-box\" class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\">Featured</h4></div><div class=\"panel-body\"><div role=\"tabpanel\"><ul role=\"tablist\" class=\"nav nav-tabs\"><li role=\"presentation\" class=\"active\"><a href=\"#image\" aria-controls=\"image\" role=\"tab\" data-toggle=\"tab\" class=\"tab-name\">Image</a></li><li role=\"presentation\"><a href=\"#video\" aria-controls=\"video\" role=\"tab\" data-toggle=\"tab\" class=\"tab-name\">Video</a></li></ul><div class=\"tab-content\"><div id=\"image\" role=\"tabpanel\" class=\"tab-pane active\"></div><div id=\"video\" role=\"tabpanel\" class=\"tab-pane\"></div></div></div></div></div><div id=\"status-box\" class=\"panel panel-default\"><div class=\"panel-heading\"><h4 class=\"panel-title\">Status</h4></div><div class=\"panel-body\"><div class=\"checkbox\"><label><input type=\"checkbox\" name=\"published\" required=\"required\"/>Published</label></div><a id=\"post-date\" href=\"#\">April 26, 2015</a></div></div></div></form></div>");;return buf.join("");
}

