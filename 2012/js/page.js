/*===================================================================
*Filename: page.js
*Template: Portfolio
*Code Author: Dainis S
*Homepage: www.nextgen.lv
*Date Created: 15.01.12
===================================================================*/
$(document).ready(function(){
		//Add class 'workgroup' for icons with link and call colorbox
		$("ul.work li a[href!=#]").addClass("workGroup");
		$(".workGroup").colorbox({loop:false, initialWidth:"0", initialHeight:"0", preloading:false, width:"100%", height:"100%", innerHeight:"80%", innerWidth:"70%"});
		//Add colorbox to contact pages. Important! set --> innerWidth: original +14px, innerHeight +10px for the iframe page settings
		$(".cAbout").colorbox({iframe:true, innerWidth:"437px", innerHeight:"511px", loop:false, initialWidth:"0", loop:false, initialHeight:"0", preloading:false});
		$(".contacts").colorbox({iframe:true, onClosed:true, innerWidth:"386px", innerHeight:"235px", loop:false, initialWidth:"0", initialHeight:"0", preloading:false});
		$(".contacts, .cAbout").colorbox({onLoad:function(){
			$("#cboxClose").css({ "top" : "-8px", "right" : "-0px"});
			$("#cboxContent").css({"margin-top" : "10px"});
							}, onClosed:function () {
								$("#cboxClose").css({"top": "", "right": ""});
								$("#cboxContent").css({"margin-top": ""}); }
							});

		//Check if icon already viewed once and add class 'visited'
		$(".workGroup").colorbox({onComplete:function(){
			if($(this).hasClass('visited')) {
				} else {
			$(this).addClass("visited");
				var backgroundPos = $(this).css('backgroundPosition').split(" ");
				var xPos = parseFloat(backgroundPos[0]), yPos = parseFloat(backgroundPos[1]);
				var bgW = parseFloat($(this).css('width'));
				var xNPos = xPos - (bgW * 2), yNPos = yPos;
				$(this).css('backgroundPosition', xNPos + "px" + " " + yNPos + "px");				
					}	
		}});

		//Hover effect for icons, modify css sprite 'background-positon' values
		$("ul.work li a").hover(function(){
			var backgroundPos = $(this).css('backgroundPosition').split(" ");
			var xPos = parseFloat(backgroundPos[0]), yPos = parseFloat(backgroundPos[1]);
				xNPos = xPos; yNPos = yPos;
			    bgWn = parseFloat($(this).css('width'));
			
			if($(this).hasClass('visited')) {
				xNPos += bgWn; 
				yNPos = yNPos;
				
				} else {
				xNPos -= bgWn; 
				yNPos = yNPos;					
					}	
			$(this).css('backgroundPosition', xNPos + "px" + " " + yNPos + "px");	
		},function(){
			if($(this).hasClass('visited')) {
				xNPos -= bgWn;
				yNPos = yNPos;
				} else {
				xNPos += bgWn; 
				yNPos = yNPos;					
					}
			$(this).css('backgroundPosition',  xNPos + "px" + " " + yNPos + "px");
			});

}); 