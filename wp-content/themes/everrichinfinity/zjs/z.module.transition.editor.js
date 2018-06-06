// MODULE UI BUTTON
zjs.require('transition', function(){"use strict";

	var keyframeprefixkey = 'zjsmoduletransitionkeyframeprefix';
		
	// global
	var editorWindow = false,
		hasKeyframeEls = {},
		
		// data send to popup window
		keyframeGroupNames = [],
		hasKeyframeElsInfo = {},
		
		// data sync with popup window
		currentPoint = 0,
		currentGroupName = '';
	
	
	zjs.extendCore({
		transitionOpenEditorWindow: function(){
			// stop het may cai banner dang play
			if('moduleTransitionBannerOption' in zjs)
				zjs('.zbanner').stopBanner();
			
			editorWindow = window.open('http://app.april.com.vn/transitioneditor','_blank','menubar=no,status=no,toolbar=no');	
		}
	});
	
	
	// Listener message
	zjs(window).on('message', function(event){
		
		//console.log(event.original);
		// event.original.source is popup window
		// event.original.data is [object]
		if(!zjs.isObject(event.original.data))return;
		
		// message hoi thong tin init
		if(event.original.data.action == 'sendmeinit'){
			
			// bay gio se di get ra het tat ca moi element de xem coi thang element nao dang duoc setKeyframes
			var allEls = zjs('*');
			
			// reset global data
			hasKeyframeEls = {};
			keyframeGroupNames = [],
			hasKeyframeElsInfo = {};
			// --
			
			
			allEls.each(function(element){
				var zEl = zjs(element),
					allData = zEl.getAllData(),
					hasKeyframe = false;
				if(allData){
					// test xem coi co key frame khong, neu nhu co thi se track lai, va dua element nay vao 
					for(var datakey in allData){
						if(datakey.indexOf(keyframeprefixkey) > -1){
							hasKeyframe = true;
							if(!keyframeGroupNames.include(datakey.replace(keyframeprefixkey, '')))
								keyframeGroupNames.push(datakey.replace(keyframeprefixkey, ''));
						}
					}
				}
				if(hasKeyframe){
					// tao ra 1 dinh danh cho cai element nay
					var uid = 'u' + zjs.getUniqueId(),
						name = zEl.getAttr('data-keyframes-name', '');
					
					// neu nhu van khong co name thi se co gang fix	
					if(name == '')
						name = zEl.getData('keyframesName', '');
					
					hasKeyframeEls[uid] = zEl;
					
					var keyframeElInfo = {
						name: name,
						groups: {}
					};
					
					for(var datakey in allData){
						if(datakey.indexOf(keyframeprefixkey) > -1){
							var groupName = datakey.replace(keyframeprefixkey, '');
							keyframeElInfo.groups[groupName] = allData[datakey];
						}
					};
					
					hasKeyframeElsInfo[uid] = keyframeElInfo;
				}
			});
			
			//console.log(hasKeyframeEls, keyframeGroupNames);
			editorWindow.postMessage({action:'init', websiteUrl:window.location.href, keyframeGroupNames:keyframeGroupNames, hasKeyframeElsInfo:hasKeyframeElsInfo}, 'http://app.april.com.vn');
		};
		
		
		// message yeu cau sync timeline
		if(event.original.data.action == 'synctimeline'){
			
			currentPoint = event.original.data.currentPoint,
			currentGroupName = event.original.data.currentGroupName;
			
			// lap trong hasKeyframeElsInfo de kiem ra cai element phu hop
			for(var uid in hasKeyframeElsInfo){
				// xem coi neu nhu trong groups khong co cai current groupname thi thoi
				if(!currentGroupName in hasKeyframeElsInfo[uid].groups || !zjs.isObject(hasKeyframeElsInfo[uid].groups[currentGroupName]))
					continue;
				
				// di set lai style thoi
				hasKeyframeEls[uid].setStyleByKeyframes(currentGroupName, currentPoint);
				
				// sau khi set style xong thi se sync value cua cac property qua cho popup window
				for(var propertyName in hasKeyframeElsInfo[uid].groups[currentGroupName]){
					editorWindow.postMessage({action:'syncpropertyvalue', 
												uid:uid, 
												propertyName:propertyName, 
												propertyValue:hasKeyframeEls[uid].getStyle(propertyName),
												propertyUnit:hasKeyframeElsInfo[uid].groups[currentGroupName][propertyName].unit,
											}, 'http://app.april.com.vn');
				};
			};
		};
		
		
		// message yeu cau sync keyframes
		if(event.original.data.action == 'synckeyframes'){
			
			var uid = event.original.data.uid,
				keyframes = event.original.data.keyframes;
			
			// set lai keyframes thoi
			hasKeyframeEls[uid].setKeyframes(currentGroupName, keyframes);
			
			// di set lai style thoi
			hasKeyframeEls[uid].setStyleByKeyframes(currentGroupName, currentPoint);
			
			// sau khi set style xong thi se sync value cua cac property qua cho popup window
			for(var propertyName in hasKeyframeElsInfo[uid].groups[currentGroupName]){
				editorWindow.postMessage({action:'syncpropertyvalue', 
											uid:uid, 
											propertyName:propertyName, 
											propertyValue:hasKeyframeEls[uid].getStyle(propertyName),
											propertyUnit:hasKeyframeElsInfo[uid].groups[currentGroupName][propertyName].unit,
										}, 'http://app.april.com.vn');
			};
		};
		
		
		
		// message yeu cau sync property
		if(event.original.data.action == 'syncproperty'){
			
			// update
			currentGroupName = event.original.data.currentGroupName;
			
			var uid = event.original.data.uid, 
				propertyName = event.original.data.propertyName, 
				newProperty = event.original.data.newProperty;
			
			hasKeyframeElsInfo[uid].groups[currentGroupName][propertyName] = newProperty;
		};


		
		// message yeu cau show/hide uid nao do
		if(event.original.data.action == 'hideuid'){
			hasKeyframeEls[event.original.data.uid].hide();
		};
		if(event.original.data.action == 'showuid'){	
			hasKeyframeEls[event.original.data.uid].show();
		};
		
		
		
	});
	
	
	// open editor window first time
	zjs.transitionOpenEditorWindow();
	

	//fix de tuong thich voi zjs version 1.0
	if('required' in zjs)
	zjs.required('transition.editor');
});