// MODULE UI POPUP
zjs.require('ui', function(){
"use strict";
	
	var optionkey = 'zmoduleuipopupoption',
		pagecoverElKey = 'zmoduleuipopupcoverel',
		showedScrolltopkey = 'zmoduleuipopupscrolltop';	
		
	// extend core mot so option
	zjs.extendCore({
		moduleUiPopupOption: {
			width: 'auto',
			height: 'auto',
			autoshow: false,
			closebutton: true,
			closethenremove: false,
			pagecover: true,
			clickout: false,
			pressEsc: true,
			center: true,
			centerY: false, 
			fade: true,
			fadeCover: false,
			fadeTime: 500,
			animate: false,
			animateTime: 1000,
			animateName:'fadeInDown fadeOutUp'
		}
	});
	
	// trigger
	//ui.popup.hide
	//ui.popup.show
	//ui.popup.refresh
	
	// template
	var popupclass = 'zui-popup',
		hideclass = 'zui-popup-hide',
		coverclass = 'zui-popup-page-cover',
		wrapclass = 'zui-popup-wrapper',
		centerclass = 'zui-popup-center',
		_closehtml = '<a class="zui-popup-close">×</a>',
		
		// uninitialaze hide class
		uninitclass = 'zui-uiuninithide zui-uiuninithideh';
	
	// static variable
	// luu vao top frame luon cho chac
	var getPopuplastindex = (function(){
		// test coi co duoc access vao trong top khong
		var topWindowAccess = false;
		try{var a = typeof top.document;
		top.document.body.offsetTop = top.document.body.offsetTop;
		topWindowAccess = true;
		}catch(er){};
		
		if(topWindowAccess){if(isNaN(top.popuplastindex))top.popuplastindex = 10000;}
		else{if(isNaN(window.popuplastindex))window.popuplastindex = 10000;};
		
		return function(){
			if(topWindowAccess)return top.popuplastindex++;
			return window.popuplastindex++;
		};
	})();
	
	// cho 1 thang de luu vao last popup duoc show ra, de ma su dung duoc phim esc
	window.zpopupelementstack = [];

	// - - - - - - - - -
	// MAIN FUNCTIONS
	var makePopup = function(element, useroption){

		var zPopupEl = zjs(element);
		
		// - - - 
		// neu ma co roi thi se ghi lai option
		// option luc nay la option cua user
		var option = zPopupEl.getData(optionkey);
		
		// flag y bao phai refresh lai option
		if(option){
			zPopupEl.setData(optionkey, zjs.extend(option, useroption));
			return;
		};
		
		// - - - 
		// neu ma chua co thi se lam binh thuong
		// copy option tu default option
		option = zjs.clone(zjs.moduleUiPopupOption);
		// extend from inline option ?
		var inlineoption = zPopupEl.getAttr('data-option', '');
		if(zjs.isString(inlineoption) && inlineoption.trim()!='')
			option = zjs.extend(option, inlineoption.jsonDecode());
		// sau do remove di luon inline option luon, cho html ra dep
		zPopupEl.removeAttr('data-option');
		// extend from user option ?
		if(typeof useroption!='undefined')
			option = zjs.extend(option, useroption);
		// fix option:
		option.fadeTime = parseInt(option.fadeTime);
		// fix option:
		// neu nhu ma co animate thi se khong co fade, keo lai bi conflict
		if(option.animate)option.fade = !(option.fadeCover = true);
		option.animateTime = parseInt(option.animateTime);
		option.animateCoverTime = parseInt(option.animateCoverTime);
		// save option
		zPopupEl.setData(optionkey, option);
		
		// - - -
		// start coding module
		
		// se stop lai hook ngay luc nay keo lai bi loi~ nua
		var bakHookStatus = zjs.enablehook();
		zjs.enablehook(false);
		// --
		
		// add class for popup
		zPopupEl.addClass(popupclass);
		if(option.center)
			zPopupEl.addClass(centerclass);
		if(option.animate)
			zPopupEl.addClass(option.animateName).setStyle('animation-duration', option.animateTime+'ms');
		
		// popup page cover
		var zPopupPCoverEl = zjs();
		if(option.pagecover){
			zPopupPCoverEl = zjs('<div>').addClass(coverclass);
			// xem coi cai popup element co cai id nao ko?
			// co thi set cho cai thang cover luon
			var _id = zPopupEl.getAttr('id', '');
			if(_id!='')zPopupPCoverEl.addClass(coverclass+'-'+_id);
			// click outside to close ?
			if(option.clickout)
				zPopupPCoverEl.click(function(){popupHide(element)});
		};
		zPopupEl.setData(pagecoverElKey, zPopupPCoverEl);
		
		// popup wrapper
		var zPopupWrapEl = zjs('<div>').addClass(wrapclass);
		
		// copy het noi dung qua wrapper
		zPopupEl.child().each(function(el){zPopupWrapEl.append(el)});
		zPopupEl.append(zPopupWrapEl);
		
		// --
		// xong het roi thi bay gio moi set lai tinh trang cua hook
		zjs.enablehook(bakHookStatus);
		
		// find coi coi trong day co element nao duoc
		// chon de su dung nhu la nut close hay khong
		var zPopupCloseEl = zPopupEl.find('.zpopupclose');
		// neu nhu ma nguoi dung chua chuan bi nut close
		// thi module se tu tao ra 1 cai nut
		// voi dieu kien la trong option cho phep
		if(zPopupCloseEl.count()==0 && option.closebutton)
			zPopupCloseEl = zjs(_closehtml).prependTo(zPopupEl);
		// bind event cho cai nut close nay luon
		zPopupCloseEl.click(function(event, el){
			if(this.hasClass('disabled'))return;
			popupHide(element);
		});
		
		// show or hide popup
		if(option.autoshow)popupShow(element);
		else popupHide(element, true, true);
		
		// xong xuoi het roi thi remove di un-init class thoi
		zPopupEl.removeClass(uninitclass);
		
		// bind event cho window khi ma resize
		zjs(window)
			.on('resize', function(){popupAlignTop(element)})
			.on('scroll', function(){popupAlignTop(element)});
	},
	
	// luu lai 1 so timer cho chac
	timer1 = false,
	timer2 = false,
	
	popupShow = function(element){
		// check coi co phai la popup hay khong
		var zPopupEl = zjs(element);
		var option = zPopupEl.data(optionkey);
		if(!option)return;
		zPopupEl.data(pagecoverElKey).insertBefore(zPopupEl).style('z-index', getPopuplastindex());
		zPopupEl.removeClass(hideclass).style('z-index', getPopuplastindex());
		// save lai current scrolltop cua body
		// de co gi thi dung lai
		zPopupEl.setData(showedScrolltopkey, document.body.scrollTop);
		popupRefresh(element);
		// neu nhu fade (old version) thi se dung script de fade
		if(option.fade)zPopupEl.fadeIn({time:option.fadeTime});
		if(option.fadeCover)zPopupEl.data(pagecoverElKey).fadeIn({time:option.fadeTime});
		// neu nhu animate thi se add cac class phu hop de ma dung css3 animate
		if(option.animate){
			// stop timer truoc do cho chac an
			window.clearTimeout(timer1);window.clearTimeout(timer2);
			zPopupEl.addClass('showing animate animate-start');
			timer1 = (function(){zPopupEl.addClass('animate-end')}).delay(option.animateTime);
			timer2 = (function(){zPopupEl.removeClass('showing animate animate-start animate-end')}).delay(option.animateTime + 100);
		};
		// add class cho popup
		// run trigger
		zPopupEl.addClass('active').trigger('ui.popup.show');
		if(zPopupEl.hasClass(centerclass))popupAlignTop(element);
		
		// sau do se set 1 cai instant de ma co gi con dung esc duoc
		if(option.pressEsc){
			var popupShowInstanceId = zjs.getUniqueId();
			zPopupEl.setAttr('data-show-instance', popupShowInstanceId);
			// quang cai nay vao array thoi
			window.zpopupelementstack.push(popupShowInstanceId);
		};
		
		// helper 1 xiu cho form cho vui
		// cai nay se auto focus may cai field luon
		(function(){zPopupEl.find('.autofocus').focus()}).delay(500);
	},
	
	popupHide = function(element, notUseFade, initHide){
		// check coi co phai la popup hay khong
		var zPopupEl = zjs(element);
		var option = zPopupEl.data(optionkey);
		if(!option)return;
		if(zPopupEl.hasClass(hideclass))return;
		
		var _popupHide = function(){
				zPopupEl.addClass(hideclass);
				// run trigger
				zPopupEl.removeClass('active').trigger('ui.popup.hide');

				// closethenremove ?
				if(!initHide && option.closethenremove)zPopupEl.remove();
			},
			_popupCoverHide = function(){
				if(zPopupEl)
					zPopupEl.data(pagecoverElKey).remove(false);
			};
		
		notUseFade = notUseFade || false;
		
		
		// hide popup
		if(!notUseFade && option.fade && !option.animate)zPopupEl.fadeOut({time:option.fadeTime, callback:_popupHide});

		// neu nhu animate thi se add cac class phu hop de ma dung css3 animate
		else if(!notUseFade && option.animate){
			// stop timer truoc do cho chac an
			window.clearTimeout(timer1);window.clearTimeout(timer2);
			zPopupEl.addClass('hiding animate animate-start');
			timer1 = (function(){zPopupEl.addClass('animate-end')}).delay(option.animateTime);
			timer2 = (function(){zPopupEl.removeClass('hiding animate animate-start animate-end');_popupHide()}).delay(option.animateTime + 100);
		}
		
		else _popupHide();
		
		// --
		
		// chi remove pagecoverElKey thoi
		// khong remove deep, vay nen set remove(deep = false)
		if(!notUseFade && option.fadeCover)zPopupEl.data(pagecoverElKey).fadeOut({time:option.fadeTime, callback:_popupCoverHide});
		
		else _popupCoverHide();
		
		
		// xoa di thong tin show instance
		zPopupEl.removeAttr('data-show-instance');
	},
	
	popupRefresh = function(element){
		// check coi co phai la popup hay khong
		var zPopupEl = zjs(element);
		if(!zPopupEl.data(optionkey))return;
		if(zPopupEl.hasClass(hideclass))return;
		// fix show to center
		if(zPopupEl.hasClass(centerclass))popupAlignTop(element);
		// run trigger
		zPopupEl.trigger('ui.popup.refresh');
	},
	
	popupAlignTop = function(element){
		// check coi co phai la popup hay khong
		var zPopupEl = zjs(element);
		var option = zPopupEl.data(optionkey);
		if(!option)return;
		if(!zPopupEl.hasClass(centerclass))return;
		
		// margin top
		var diffHeight = zjs(window).height() - zPopupEl.height();
		if(diffHeight > 0){
			var marginTop = -zPopupEl.height()/2;
			// neu nhu ma khong can center chinh xac theo y thi se fix lai cai margin 1 ty cho dep
			if(!option.centerY)
				marginTop = marginTop - diffHeight / 6;
		}
		
		// neu nhu window height be hon thi phai xem set den scrolltop
		else{
			var saveScrollTop = zPopupEl.getData(showedScrolltopkey),
				diffScrollTop = saveScrollTop - document.body.scrollTop;

			if(diffScrollTop < diffHeight)diffScrollTop = diffHeight;
			if(diffScrollTop > 0)diffScrollTop = 0;
			
			var marginTop = -zPopupEl.height()/2 - diffHeight /2 + diffScrollTop;
		};
		zPopupEl.style('margin-top', marginTop);
		
		// margin left
		zPopupEl.style('margin-left', -zPopupEl.width()/2);
	};
	
	
	// bind event cho document
	zjs(document).on('keyup', function(event){
		if(event.keyCode() != 27)return;
		
		// bay gio se la qua trinh di tim cai thang can phai remove nha
		var popupShowInstanceEl = false;
		while(window.zpopupelementstack.length > 0){
			var _id = window.zpopupelementstack.pop();
			popupShowInstanceEl = zjs('.zui-popup[data-show-instance="'+_id+'"]');
			if(popupShowInstanceEl.count()>0)break;
			else popupShowInstanceEl = false;
		};
		
		// xem coi co tim ra duoc khong?
		if(!popupShowInstanceEl)return;
		
		// tim duoc thi tam thoi prevent default lan ESC nay
		event.preventDefault();
		
		// hide thoi
		popupShowInstanceEl.popupHide();
	});
	
	
	// - - - - - - - - - 
	// EXTEND METHOD cho zjs-instance
	zjs.extendMethod({
		makePopup: function(useroption){
			return this.each(function(element){makePopup(element, useroption)});
		},
		popupShow: function(){
			return this.each(function(element){popupShow(element)});
		},
		popupHide: function(){
			return this.each(function(element){popupHide(element)});
		},
		popupRefresh: function(){
			return this.each(function(element){popupRefresh(element)});
		}
	});
	
	// - - - - - -
	// REG HOOK nhung khong auto enable hook
	zjs.hook({
		after_setInnerHTML: function(el){
			// kiem tra xem trong so cac thang con
			// co class nao la zpopup ko, neu nhu co thi se auto makePopup luon
			zjs(el).find('.zpopup').makePopup();
			// kiem tra xem thang cha co phai la popup hay khong
			// neu phai thi refresh cho no (lam den 3 cap cha thoi)
			zjs(el).parent().popupRefresh().parent().popupRefresh().parent().popupRefresh();
		},
		after_insertDOM: function(el){
			// kiem tra xem trong so cac thang con, va ngay ca thang con
			// co class nao la zpopup ko, neu nhu co thi se auto makePopup luon
			if(zjs(el).hasClass('zpopup'))zjs(el).makePopup();
			zjs(el).find('.zpopup').makePopup();
			// kiem tra xem thang cha co phai la popup hay khong
			// neu phai thi refresh cho no (lam den 3 cap cha thoi)
			zjs(el).parent().popupRefresh().parent().popupRefresh().parent().popupRefresh();
		}
	});
	
	// AUTO INIT
	zjs.onready(function(){zjs('.zpopup').makePopup()});
	//fix de tuong thich voi zjs version 1.0
	if('required' in zjs)
	zjs.required('ui.popup');
});