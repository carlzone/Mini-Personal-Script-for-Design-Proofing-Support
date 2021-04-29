(function($){
	var name;
	$(document).ready(function(){
		create_proofing_support();
		get_customer_name();
		get_order_number();
		get_da();
		get_qc();
		get_design_request();
		set_photos();
		set_sku();
		set_details();
		set_seartch();
		locate_static_element_instruction();
		locate_order_detail();
		get_color_customization();
		compair_preview();
		validate_bbutton();
		
		$("#hide").click(function(){
			$(".kazejin-container").slideUp();
			$(".proofing-support").slideDown();
			if($(".preview-container").css('display')!='none'){
				$(".preview-container").slideToggle();
			}
		});
		$(".show-button").click(function(){
			$(".kazejin-container").slideDown();
			$(".proofing-support").slideUp();
		});
		$("#card_preview").click(function(){
			$(".preview-container").slideToggle();
		});
		//$("#back_baacker button").click(function(){
		//	addBacker();
		//});
		
		$('.kazejin-tab').click(function(){
			var objectID = $(this).attr('id');
			var isSelected = $(this).hasClass('kazejin-tab-item-selected');
			if(!isSelected && objectID == 'cw_preview'){
				original_preview_tab(this);
			}
			else if(!isSelected && objectID == 'round_btn_preview'){
				round_preview_tab(this);
			}
		});
		$(".btn-option").click(function(){
			option_preview(this);
		});
		$("span").click(function(){
			if($(this).attr("id") == "toggle_annotation"){
				$("span[id='toggle_annotation']").toggleClass("far fa-eye");
				$("span[id='toggle_annotation']").toggleClass("far fa-eye-slash");
				$(".annot-pointer").slideToggle();
			}
		});
	});
	
	function option_preview(x){
		$(x).parent().find("li").each(function(){
			if($(this).hasClass('option_selected')){
				$(this).removeClass('option_selected');
				$(this).addClass('option_tab_button');
				var posSelected = $(this).attr('id').split('_');
				var posNotSelected = $(x).attr('id').split('_');
				$("#option_"+posSelected[1]+"_"+posSelected[2]).toggleClass('hidden');
				$("#option_"+posNotSelected[1]+"_"+posNotSelected[2]).toggleClass('hidden');
				$("#option_"+posSelected[1]+"_"+posSelected[2]).find(".notes-container").toggleClass('hidden');
				$("#option_"+posNotSelected[1]+"_"+posNotSelected[2]).find(".notes-container").toggleClass('hidden');
				return false;
			}
		});
		$(x).removeClass('option_tab_button');
		$(x).addClass('option_selected');
		
	}
	
	function original_preview_tab(x){
		$('.kazejin-links-group li').each(function(index){
			if($(this).hasClass('kazejin-tab-item-selected')){
				$(this).removeClass('kazejin-tab-item-selected');
				$(this).addClass('kazejin-tab-item');
				$('#original').toggleClass('hidden');
				$('#web-to-print').toggleClass('hidden');
				return false;
			}
		});
		$(x).removeClass('kazejin-tab-item');
		$(x).addClass('kazejin-tab-item-selected');
	}
	
	function round_preview_tab(x){
		$('.kazejin-links-group li[id="round_btn_preview"]').each(function(index){
			
			if($(this).hasClass('kazejin-tab-item-selected')){
				var position = $(this).find('span').html().split(" ")[1].trim();
				var position2 = $(x).find('span').html().split(" ")[1].trim();
				$(this).removeClass('kazejin-tab-item-selected');
				$(this).addClass('kazejin-tab-item');
				$("#round_"+(position)).toggleClass("hidden");
				$("#round_"+(position2)).toggleClass("hidden");
				return false;
			}
		});
		$(x).removeClass('kazejin-tab-item');
		$(x).addClass('kazejin-tab-item-selected');
	}
	
	function validate_bbutton(){
		var da = $("#da_name").text();
		
		if(da.includes("Carlson Cascara")){
			$("#back_baacker").css("display","block");
		}
	}
	
	function locate_static_element_instruction(){
		var flag=false;
		$("#personalizations-container div").each(function(index){
			if($(this).has("<h2>")){
				var content=$(this).find("h2 span").text();
				if(content=="Static Element Instructions"){
					content=$(this).find("table").html();
					$("#static_instruction").html("<table>"+content+"</table>");
					flag=true;
				}
			}
		});
		if(!flag){
			$("#static_instruction").html("No Static Instruction!");
		}
	}
	
	function locate_order_detail(){
		var flag=false;
		$("#personalizations-container div").each(function(index){
			if($(this).has("<h2>")){
				if($(this).find("h2 span").text()=="Order Notes"){
					$(this).find("table tbody tr").each(function(index){
						var text = $(this).find("td:nth-child(3)").html();
						if(index>0){
							$("#order_notes").append("<hr>\n");
						}
						$("#order_notes").append(text+"\n");
					});
					flag=true;
				}
			}
		});
		if(!flag){
			$("#order_notes").html("No Order Notes!");
		}
	}
	
	function get_color_customization(){
		var flag = false;
		$("#personalizations-container div").each(function(){
			if($(this).find("h2 span").text() == "Color Customization"){
				$(this).find("div:nth-child(3) tr").each(function(index){
					if(index>0){
						console.log("index:"+index);
		    			var colorcode = $.trim($(this).find("td:nth-child(1)").text());
		    			var colordetail = $.trim($(this).find("td:nth-child(2)").text());
		    			$("#color-custom").append("<div class='kazejin-row'>\
		    				<div class='kazejin-col-3'>\
		    					<p>"+colorcode +"</p>\
		    					<span style='display:inline-block; background:#"+colorcode +"; width:50px; height:50px; text-alignment:middle;'><span>\
		    				</div>\
		    				<div class='kazejin-col-6 text-left tpadd-2'><p>"+colordetail+"</p></div>\
		    			</div>\
		    			");
					}
				});
				flag = true;
			}
		});
		if(!flag){
			$("#color-custom").html("No Color Customization!");
		}
	}
	
	function get_customer_name(){
		var str = $("#cust-info h3").text().replace(/Your customer: /g, '');
		$("#customer_name").html(str.trim().split(",")[0]);
	}
	
	function get_order_number(){
		var or=$("#cust-info a").text().trim();
		$("#order_number").html(or);
	}
	
	function get_design_request(){
		if($(".proof-detail-instructions").length){
			$(".proof-detail-instructions").each(function(){
				$("#design_request").append($(this).find("p").html());
				$("#design_request").append("<br>");
			});
		}else{
			$("#design_request").html("No Design Request");
		}
	}
	
	function set_photos(){
		var or = $("#order_number").html();
		$("#photos").attr("href","https://mbo.minted.com/mbo_customer_photo_tray?user_email=&order_number=" + or);
	}
	
	function set_sku(){
		var skuURL = $("#proof-summary table tr:nth-child(1) td:nth-child(2) a").attr("href");
		$("#sku").attr("href",skuURL);
	}
	
	function set_details(){
		var details = $("#cust-info a").attr("href");
		$("#details").attr("href",details);
	}
	
	function set_seartch(){
		$("#search").attr("href","https://mbo.minted.com/mbo/orders");
	}
	
	function compair_preview(){
		$(".proof-detail-customer-preview-container img").each(function(e){
			$("#original").append(
				"<img class='card-preview' src='"+$(this).attr("src")+"' style='width:600px' />"
			);
		});
		$(".proof-detail-web-to-proof-container img").each(function(e){
			$("#web-to-print").append(
				"<img class='card-preview' src='"+$(this).attr("src")+"' style='width:600px' />"
			);
		});
		$("#options-created #round").each(function(x){
			if(x>0){
				$("#round_container").append("<div id='round_"+x+"' class='tab-content'></div>");
				var selected = "kazejin-tab-item-selected";
				if(x>1){
					selected = "kazejin-tab-item";
					$("#round_container #round_"+x).addClass("hidden");
				}
				$(".tab-button-container ul").append("\
				<li id='round_btn_preview' class='"+selected+" kazejin-tab float-right'>\
					<span class='kazejin-tab-button'>Round "+x+"</span>\
				</li>\
				");
				var opnum = 0;
				$(this).find("#proof-item-option-container").each(function(y){
					$("#round_"+x).append("<div id='option_"+x+"_"+y+"' class='tab-content option-container'></div>");
					var annotCnt = 0;
					$(this).find("img").each(function(z){
						if(!$(this).parent().parent().hasClass('user-photo-container')){
							$("#option_"+x+"_"+y).append("<div class='page-container page-container-"+z+"'></div>");
							$("#option_"+x+"_"+y+" .page-container-"+z).append("<img class='card-preview' src='"+$(this).attr("src")+"' style='width:600px' />");
							$(this).parent().find(".annotation-box").each(function(){
								var leftPosition=$(this).css("left").replace("px","");
								var topPosition=($(this).css("top").replace("px",""));
								$("#option_"+x+"_"+y+" .page-container-"+z).append("\
									<div class='annot-pointer' style='top:"+(topPosition*0.674)+"px; left:"+(leftPosition*0.673)+"px;'>\
										<span class='annot-pointer-name'>"+(annotCnt+1)+"</span>\
									</div>\
								");
								annotCnt++;
							});
						}
					});
					var comments = get_comments(this);
					var annotations = get_annotation(this);
					if(comments != "" || annotations != ""){
						$("#option_"+x+"_"+y).append("<div class='notes-container'></div>");
						
						if(comments!=""){
							$("#option_"+x+"_"+y).find(".notes-container").append("\
							<div class='kazejin-comments-container'>\
								<div class='kazejin-comment-title'><h3><b>Comments</b></h3></div>\
								<div class='kazejin-comment-content'>"+comments+"</div>\
							</div>\
							");
							$("#option_"+x+"_"+y).find(".kazejin-comment-content div input").parent().remove();
							$("#option_"+x+"_"+y).find(".kazejin-comment-content span a").parent().remove();
							$("#option_"+x+"_"+y).find(".kazejin-comment-content span textarea").parent().remove();
							$("#option_"+x+"_"+y).find(".kazejin-comment-content #comment-header").remove();
							$("#option_"+x+"_"+y).find(".kazejin-comment-content a").remove();
							var pastTag = "";
							$("#option_"+x+"_"+y).find(".kazejin-comment-content").children().each(function(i){
								var curTag = $(this).prop("tagName");
								if(pastTag != ""){
									if(curTag=="BR" && pastTag=="BR"){
										$(this).remove();
									}else{
										pastTag = $(this).prop("tagName");
									}
								}else{
									pastTag = $(this).prop("tagName");
								}
							});
							$("#option_"+x+"_"+y).find(".kazejin-comment-content br:first-child").remove();
						}
						if(annotations!=""){
							$("#option_"+x+"_"+y).find(".notes-container").append("\
							<div class='kazejin-annotations-container'>\
								<div class='kazejin-annotation-title'><h3><b>Annotations</b> <span id='toggle_annotation' class='far fa-eye'></span></h3></div>\
								<div class='kazejin-annotation-content'>"+annotations+"</div>\
							</div>\
							");
							$("#option_"+x+"_"+y).find(".kazejin-annotation-content .annotation").remove();
							$("#option_"+x+"_"+y).find(".kazejin-annotation-content").html($(".kazejin-annotation-content").text().trim());
							if($("#option_"+x+"_"+y).find(".kazejin-annotation-content").is(":empty")){
								$("#option_"+x+"_"+y).find(".kazejin-annotations-container").remove();
							}
							else{
								var reg = /\d: /g;
								var annot_text = $("#option_"+x+"_"+y).find(".kazejin-annotation-content").text();
								var annot_group = annot_text.split(reg);
								console.log(annot_text);
								$("#option_"+x+"_"+y).find(".kazejin-annotation-content").html("");
								$.each(annot_group,function(i, val){
									if(i > 0){
										if(i > 1){
											$("#option_"+x+"_"+y).find(".kazejin-annotation-content").append("<hr>");
										}
										$("#option_"+x+"_"+y).find(".kazejin-annotation-content").append(i+") "+annot_group[i].trim());
									}
								});
							}
						}
					}
					if(opnum > 0){
						$("#option_"+x+"_"+y).addClass("hidden");
						$("#option_"+x+"_"+y+" .notes-container").addClass('hidden');
					}
					opnum++;
				});
				if(opnum > 1){
					var opGroupID = "option_group_"+x+"_"+(opnum-1);
					$("#round_"+x).prepend("<div class='options_tab_container'><ul id='"+opGroupID+"' class='options_tab_group'></ul></div>");
					for(var cnt=0; cnt < opnum; cnt++){
						$("#"+opGroupID).append("<li id='option-tab-btn_"+x+"_"+cnt+"' class='btn-option option_tab_button'><span>"+(cnt+1)+"</span></li>");
					}
					$("#option-tab-btn_"+x+"_0").removeClass("option_tab_button");
					$("#option-tab-btn_"+x+"_0").addClass("option_selected");
				}
			}
		});
	}
	
	function get_comments(parentElem){
		var comment = "";
		$(parentElem).find("#comment-container ul").each(function(i){
			$(this).find("li").each(function(iy){
				if(iy>0){
					comment += "<br>";
				}
				comment += ($(this).html());
			});
		});
		return comment;
	}
	
	function get_annotation(parentElem){
		var annotation = "";
		$(parentElem).find("#annotation-container").each(function(i){
			console.log("annotation: " + i);
			annotation += $(this).html();
		});
		return annotation;
	}
	
	function get_da(){
		$("#proof-summary tr").each(function(index){
			if($(this).find("td:nth-child(1) strong").text() == "Preferred DA"){
				$("#da_name").html($(this).find("td:nth-child(2)").text());
			}
		});
	}
	
	function get_qc(){
		$("#proof-summary tr").each(function(index){
			if($(this).find("td:nth-child(1) strong").text() == "Preferred QC"){	
				$("#qc_name").html($(this).find("td:nth-child(2)").text());
			}
		});
	}
	
	//function addBacker(){
	//	var urladdress = $(location).attr("href");
	//	window.location.href = urladdress + "&bocAutoType=file";
	//}
	
	function create_proofing_support(){
		$("head").prepend('<script src="https://kit.fontawesome.com/a076d05399.js"></script>');
		$("body").prepend("\
		<div class='preview-container'>\
			<div class='tab-preview-container'>\
				<div class='tab-button-container'>\
					<ul class='kazejin-links-group'>\
						<li id='cw_preview' class='kazejin-tab-item-selected kazejin-tab float-left'>\
							<span class='kazejin-tab-button'>Customer Preview</span>\
						</li>\
						<li id='cw_preview' class='kazejin-tab-item kazejin-tab float-left'>\
							<span class='kazejin-tab-button'>WTP Preview</span>\
						</li>\
					</ul>\
				</div>\
				<div class='tab-content-container'>\
					<div id='original' class='tab-content'></div>\
					<div id='web-to-print' class='tab-content hidden'></div>\
				</div>\
				<div id='round_container' class='tab-content-container'>\
				</div>\
			</div>\
		</div>\
		");
		$("body").prepend("\
		<div class='kazejin-container'>\
			<div class='kazejin-button'>\
				<ul class='kazejin-links-group'>\
					<li class='kazejin-links-item tab'>\
		    			<a id='photos' class='kazejin-links-link' href='#' target='_blank'>PHOTOS</a>\
					</li>\
					<li class='kazejin-links-item'>\
		    			<a id='sku' class='kazejin-links-link' href='#' target='_blank'>SKU</a>\
					</li>\
					<li class='kazejin-links-item'>\
		    			<a id='details' class='kazejin-links-link' href='#' target='_blank'>DETAILS</a>\
					</li>\
					<li class='kazejin-links-item'>\
		    			<a id='search' class='kazejin-links-link' href='#' target='_blank'>SEARCH</a>\
					</li>\
					<li class='kazejin-links-item'>\
		    			<span id='card_preview' class='kazejin-links-link' href='#'>PREVIEW</span>\
					</li>\
					<li class='kazejin-links-item close'>\
		    			<span id='hide' class='kazejin-links-link' href='#'>HIDE</span>\
					</li>\
				</ul>\
			</div>\
			<div class='kazejin-proof-details'>\
				<div class='kazejin-row'>\
					<div class='kazejin-col-2 bg-white'>\
			    		<h4 id='customer_name' class='kazejin-label'>Customer Name</h4>\
			    	</div>\
			    	<div class='kazejin-col-2 bg-white'>\
			    		<h4 id='order_number' class='kazejin-label'>Order Number</h4>\
			    	</div>\
				</div>\
				<div class='kazejin-row'>\
					<div class='kazejin-col-2 bg-gray'>\
			    		<h4 id='da_name' class='kazejin-label'>DA</h4>\
			    	</div>\
			    	<div class='kazejin-col-2 bg-gray'>\
			    		<h4 id='qc_name' class='kazejin-label'>QC</h4>\
			    	</div>\
				</div>\
				<div id='back_baacker' class='kazejin-row'>\
					<button class='backer-button' type='button'>Add Backer</button>\
				</div>\
				<div class='kazejin-row'>\
					<textarea class='text-area-field' placeholder='PUT TEXT HERE TO GRAMMARLY'></textarea>\
				</div>\
			</div>\
			<div class='kazejin-request-container'>\
				<div class='kazejin-design-request'>\
					<div class='kazejin-title-container bg-green'>\
				    	<h4 class='text-white'>Design Request</h4>\
					</div>\
					<div class='kazejin-text-area bg-white'>\
						<p id='design_request'></p>\
					</div>\
				</div>\
				<div class='kazejin-order-notes'>\
					<div class='kazejin-title-container bg-green'>\
						<h4 class='text-white'>Order Note</h4>\
					</div>\
					<div class='kazejin-text-area bg-white'>\
						<p id='order_notes'>\
						</p>\
					</div>\
				</div>\
				<div class='kazejin-static-instruction'>\
					<div class='kazejin-title-container bg-green'>\
						<h4 class='text-white'>Static Element Instructions</h4>\
					</div>\
					<div class='kazejin-text-area bg-white'>\
						<pre id='static_instruction'>\
						</pre>\
					</div>\
				</div>\
				<div class='kazejin-color-customization'>\
					<div class='kazejin-title-container bg-green'>\
						<h4 class='text-white'>Color Customization</h4>\
					</div>\
					<div id='color-custom' class='kazejin-text-area bg-white'>\
					</div>\
				</div>\
			</div>\
		</div>\
		<div class='proofing-support'>\
			<span class='show-button'>Proofing Support</span>\
		</div>\
		");
	}
})(jQuery);