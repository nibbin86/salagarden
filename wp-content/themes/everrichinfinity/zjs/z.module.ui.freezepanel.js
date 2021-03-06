// MODULE UI FREEZEPANEL
zjs.require('ui', function(){
"use strict";

	var optionkey = 'zmoduleuifreezepaneloption',
		freezepanelparentwrap = 'zmoduleuifreezepanelparentwrap',
		scrollbarIdkey = 'zmodulescrollbarid',
		scrollbarOptionkey = 'zmodulescrollbaroption';

	// extend core mot so option
	zjs.extendCore({
		moduleUiFreezepanelOption: {
			marginTop: 0,
			marginBottom: 0,
			autoDisableWhenWidthLessThan: 0
		}
	});

	// trigger
	//ui.freezepanel.load

	// class
	//zfreezepanel
	//zfreezepanelwrap

	// template
	var freezepanelclass = 'zui-freezepanel',
		freezingclass = 'zui-freezing';

	// - - - - - - - - -

	// MAIN FUNCTIONS

	var isBodyScrollbarActive = function(){
		return !zjs(document.body).hasClass('zui-scrollbar-usedefault') && parseInt(zjs(document.body).getData(scrollbarIdkey,0))>0;
	};

	var makeFreezepanel = function(element, useroption){

		var zFreezepanelEl = zjs(element);

		// - - -
		// neu ma co roi thi se ghi lai option
		// option luc nay la option cua user
		var option = zFreezepanelEl.getData(optionkey);

		// flag y bao phai refresh lai option
		if(option){
			zFreezepanelEl.setData(optionkey, zjs.extend(option, useroption));
			return;
		};

		// - - -
		// neu ma chua co thi se lam binh thuong
		// copy option tu default option
		option = zjs.clone(zjs.moduleUiFreezepanelOption);
		// extend from inline option ?
		var inlineoption = zFreezepanelEl.getAttr('data-option', '');
		if(zjs.isString(inlineoption) && inlineoption.trim()!='')
			option = zjs.extend(option, inlineoption.jsonDecode());
		// extend from user option ?
		if(typeof useroption!='undefined')
			option = zjs.extend(option, useroption);

		// fix option
		option.autoDisableWhenWidthLessThan = parseInt(option.autoDisableWhenWidthLessThan);
		if(option.autoDisableWhenWidthLessThan < 0)
			option.autoDisableWhenWidthLessThan = 0;

		// save option
		zFreezepanelEl.setData(optionkey, option);

		// - - -
		// start coding module

		// dau tien la se truy tim cac thang cha cua no
		// de xem co thang nao gan class freezepanelparentwrap hay khong
		// de ma minh biet minh xu ly
		var zParentEl = element;
		while(zParentEl){
			zParentEl = zParentEl.parentNode;
			// neu vao toi body roi thi thoi, break luon, coi nhu khong co
			if(zParentEl == document.body || zParentEl == document){zParentEl = false;break;}
			// kiem tra thu coi co class khong, co thi cung break luon
			if(zjs(zParentEl).hasClass('zfreezepanelwrap'))break;
		};
		// ok save lai de ty nua truy xuat
		if(zParentEl){
			zParentEl = zjs(zParentEl);
			zFreezepanelEl.setData(freezepanelparentwrap, zParentEl);
		};

		// add class vao cho freeze panel
		zFreezepanelEl.addClass(freezepanelclass);

		// get ra top
		var zWindowEl = zjs(window),
			zBody = zjs(document.body),
			top = zFreezepanelEl.getAbsoluteTop(),
			moduleIsReady = true,
			isEnable = true;
		if(isBodyScrollbarActive()){
			moduleIsReady = false;
			zBody.on('scrollbar.ready', function(){
				top = zFreezepanelEl.getAbsoluteTop();
				moduleIsReady = true;
			});
		};

		// cu moi khi resize xong
		// thi phai fix lai thang top nay
		// zWindow.on('resize')...

		// tao ra 1 cai element chen vao giua
		var zchemEl = zjs('<div>').insertBefore(zFreezepanelEl).hide();
		//

		// bien nay se luu lai trang thai
		var lastTopbtnsStt = false,
			autoresize = false;

		// ham xu ly freeze
		function freezeHandler(){

			if(!moduleIsReady)return;

			var _currentScrollTop = isBodyScrollbarActive() ? zBody.scrollPosition() : zWindowEl.scrollTop();
			var newTopbtnsStt = _currentScrollTop > top - option.marginTop;

			if(!isEnable){
				// tuy khong cho can thiep qua sau
				// nhung van can phai tracking lai
				if(newTopbtnsStt == lastTopbtnsStt)
					return;

				lastTopbtnsStt = newTopbtnsStt
				return;
			};


			var _currentScrollTop = isBodyScrollbarActive() ? zBody.scrollPosition() : zWindowEl.scrollTop();
			var newTopbtnsStt = _currentScrollTop > top - option.marginTop;

			// test them 1 phat nua
			// support scrollbar = css luon
			if(isBodyScrollbarActive()){
				var scrollbarOption = zBody.getData(scrollbarOptionkey);
				if(scrollbarOption && scrollbarOption.usecss){
					if(zFreezepanelEl.hasClass(freezingclass))
					// add them transform vao thoi
						zFreezepanelEl.item(0,true).style.webkitTransform = 'translate3d(0, '+_currentScrollTop+'px, 0)';
					else
						zFreezepanelEl.item(0,true).style.webkitTransform = 'none';
				};
			};

			// neu nhu trang thai van nhu cu thi thoi
			if(newTopbtnsStt == lastTopbtnsStt){
				// nhung truoc khi return thi se coi co phai la dang freezee khong
				if(zParentEl && zFreezepanelEl.hasClass(freezingclass)){
					// check thi height cua thang cha, va thang con
					// coi co nen thay doi top cua thang con (thang freeze) hay khong
					var parentHeight = 	zParentEl.height(),
						parentTop = zParentEl.getAbsoluteTop(),
						height = zFreezepanelEl.height();
					// fix lai top cua freeze neu duoc
					if( _currentScrollTop > parentTop + parentHeight - option.marginBottom - option.marginTop - height )
						zFreezepanelEl.top( - _currentScrollTop + parentTop + parentHeight - option.marginBottom - height );
					else
						zFreezepanelEl.top(option.marginTop);
				};
				return;
			};

			// neu nhu trang thai thay doi
			// thi moi bat dau freezing thoi
			if(lastTopbtnsStt = newTopbtnsStt){
				// get ra size
				var width = zFreezepanelEl.width(),
					height = zFreezepanelEl.height();

				// sau do moi add class cho no thanh freeze
				zFreezepanelEl.addClass(freezingclass).top(option.marginTop);
				zBody.addClass(freezingclass);

				// fix width chinh xac luon (vi position da thanh fixed);
				zFreezepanelEl.width(width);

				// show ra cai chem de giu dung chieu cao
				zchemEl.height(height).show();
				// fix lai height cua thang chem 1 lan nua
				(function(){
					zchemEl.height(zFreezepanelEl.height());
				}).delay(50);


				// test xem coi co can thay doi width khi resize khong?
				if(width == zFreezepanelEl.parent().width()){
					// truong hop thang nay (freeze) va thang parent bang width voi nhau
					// thi hen xui la width 100%
					// nen active auto resize
					autoresize = true;
				};

			// khong freeze nua
			}else{
				stopFreeze();
			};
		};

		function stopFreeze(){
			zFreezepanelEl.removeClass(freezingclass).top('auto').width('auto');
			zBody.removeClass(freezingclass);
			zchemEl.hide();
		};

		zWindowEl.on('resize', function(){(function(){

			// xem coi co option auto hay khong?
			if(option.autoDisableWhenWidthLessThan > 0){
				// get ra cai width hien tai xem sao?
				var width = zFreezepanelEl.width();
				if(width <= option.autoDisableWhenWidthLessThan){
					// disable no thoi
					isEnable = false;
					lastTopbtnsStt = false;
					// neu nhu dang co class freezing thi remove thoi
					stopFreeze();
				}else{
					// enable len lai
					isEnable = true;
					// hander no 1 phat
					freezeHandler();
				}
			};


			// fix lai height cua thang chem
			zchemEl.height(zFreezepanelEl.height());

			// fix lai thang top
			var _topChem = zchemEl.getAbsoluteTop();
			top = ((_topChem != 0 && isEnable) ? _topChem : zFreezepanelEl.getAbsoluteTop());

			if(!autoresize)return;
			zFreezepanelEl.width(zFreezepanelEl.parent().width());
		}).delay(100)});


		// sau do bind event window scroll
		// se support scrollbar luon
		if(isBodyScrollbarActive()){
			zBody.on('scrollbar.scroll', function(){freezeHandler()});
		};

		zWindowEl.on('scroll', function(){
			if(isBodyScrollbarActive())return;
			if(!moduleIsReady && zjs(document.body).hasClass('zui-scrollbar-usedefault')){
				moduleIsReady = true;
			};
			freezeHandler();
		});


		// first run de no se fix freeze ngay va luon
		freezeHandler();
		// trigger resize 1 phat
		//zWindowEl.trigger('resize');

		// xong het roi thi run trigger thoi
		zFreezepanelEl.trigger('ui.freezepanel.load');
	};


	// - - - - - - - - -
	// EXTEND METHOD cho zjs-instance
	zjs.extendMethod({
		makeFreezepanel: function(useroption){
			return this.each(function(element){makeFreezepanel(element, useroption)});
		}
	});

	// - - - - - -
	// REG HOOK nhung khong auto enable hook
	zjs.hook({
		after_setInnerHTML: function(el){
			// kiem tra xem trong so cac thang con
			// co class nao la zfreezepanel ko, neu nhu co thi se auto makeFreezepanel luon
			zjs(el).find('.zfreezepanel').makeFreezepanel();
		},
		after_insertDOM: function(el){
			// kiem tra xem trong so cac thang con, va ngay ca thang con
			// co class nao la zfreezepanel ko, neu nhu co thi se auto makeFreezepanel luon
			if(zjs(el).hasClass('zfreezepanel'))zjs(el).makeFreezepanel();
			zjs(el).find('.zfreezepanel').makeFreezepanel();
		}
	});

	// AUTO INIT
	zjs.onready(function(){
		zjs('.zfreezepanel').makeFreezepanel();
	});
	//fix de tuong thich voi zjs version 1.0
	if('required' in zjs)
	zjs.required('ui.freezepanel');
});