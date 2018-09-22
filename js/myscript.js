// myscript for canada.xml using AJAX
$(document).ready(function() {
	console.log("in doc ready");
	
	$.ajax({
		type: "GET", url: "canada.xml", dataType: "xml",
		success: getProvs
	});
	
	$("#backHead").click(function() {
		$("#background").toggle();
	});
});  // end of doc ready

function getProvs(xml) {
	console.log(xml);
	$("#country").html( $(xml).find("name").text() );
	$("#background").html( $(xml).find("background").text()	);
	$("#background").hide();
	
	// looping through each <division>
	$("#main").html("");
	$(xml).find("division").each(function(n) {
		$("#main").append(
			"<section class='list' id='p" + n + "'>" +
				$(this).attr("name") +
				"</section><br>"
		);
		
		$("#main").append( "<ul id='d" + n + "'></ul>" );
		$("#d" + n).hide();
		
		checkDisplay(n, xml);
		
	});
}

function checkDisplay(n, xml) {
	$("#p" + n).click(function() {
		$("#d" + n).html("");
		$(xml).find("division:nth(" + n + ")").each(function() {
			$("#d" + n).append(
				"<p><strong>Capital: </strong>" +
					$(this).find("capital").text() + "</p>");
					
			$("#d"+n).append("Major Cities: <br>");
			$(this).find("city").each(function() {
				$("#d"+n).append("<li>" + $(this).text() + "</li>");
			});
		});
		
		$("ul:not([id $= '" + n + "'])").hide("slow");
		$("#d"+n).toggle("slow");
	});
}












