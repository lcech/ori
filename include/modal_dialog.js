(function ($) {
    O2.ModalDialog = function () {
        this.shim = null;
        this.dialog = null;
        this.content = null;
        this.status = "new";
        this.defaultWidth = 470;
        this.defaultHeight = 470;
        this.url = "";
        this.conf = {
            ajax: false,
            width: this.defaultWidth,
            height: this.defaultWidth,
        	handle: null
        };
        this._renderUI();
        this._bindUI();
    };
    O2.ModalDialog.prototype = {
        _renderUI: function () {
            $.getCSS(O2._paths.css_modal_dialog);
            this.shim = $("<div/>").attr("id", "modal-dialog-shim").appendTo("body");
            this.dialog = $('<div><div class="tl"/><div class="t"/><div class="tr"/><div class="r"/><div class="br"/><div class="b"/><div class="bl"/><div class="l"/><div class="x"><a class="close"/>').attr("id", "modal-dialog").appendTo("body");
            this.content = $('<div class="content"/>').appendTo(this.dialog);
        },
        _bindUI: function () {
            this.shim.click($.proxy(this.hide, this));
            this.dialog.delegate(".close", "click", $.proxy(this.hide, this));
            $(document).keydown($.proxy(this._onKeyUp, this));
            $(window).resize($.proxy(this._position, this));
        },
        show: function (url, conf) {
            var conf = conf || {};
            this.url = url;
            this.conf.ajax = conf.ajax || false;
            this.conf.width = conf.width || this.defaultWidth;
            this.conf.height = conf.height || this.defaultHeight;
            this.conf.handle = conf.handle || null;
            this.shim.css("height", $(document).height()).show();
            if (this.conf.handle !== null) {
				this.conf.handle.hide();
			}
            this.dialog.show();
            if (this.status === "new") {
            	this._position();
            	this._load();
            	this.status = "opened";
            }
        },
        hide: function (evt, forever) {
            if (evt) {
                evt.preventDefault();
            }
            this.shim.hide();
            this.dialog.hide();
            if (this.conf.handle !== null && !forever) {
				this.conf.handle.show();
			}
            //this.content.html("");
        },
        destroy: function (evt, forever) {
            if (evt) {
                evt.preventDefault();
            }
            this.shim.remove();
            this.dialog.remove();
			this.conf.handle.remove();
        },
        _load: function () {
            var dialog = this.dialog;
            if (this.conf.ajax) {
                O2.Ajax.Request.send(this.url, {
                    start: function () {
                        dialog.addClass("loading");
                    },
                    end: function () {
                        dialog.removeClass("loading");
                    }
                });
            } else {
                this.content.html($("<iframe/>").attr({
                    src: this.url,
                    frameborder: 0,
                    allowtransparency: "true"
                }));
            }
        },
        _onKeyUp: function (evt) {
            if (evt.keyCode == 27) {
                this.hide(evt);
            }
        },
        _position: function () {
            this.dialog.css({
                width: this.conf.width,
                height: this.conf.height,
                left: $(window).width() / 2 - this.conf.width / 2,
                top: $(window).scrollTop() + $(window).height() / 2 - this.conf.height / 2
            });
            this.content.css({
                width: this.conf.width,
                height: this.conf.height
            });
        }
    };
})(jQuery);