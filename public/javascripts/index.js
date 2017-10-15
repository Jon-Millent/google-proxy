$(function() {
	
	$('#search').click(render);
	$('#search-input').keydown(function(e){
		if(e.keyCode == '13')
			render();
	});

	var canSend = true;

	function render(){
		var value = $('#search-input').val();
		console.log(value)
		$('#app').html('<p style="text-align:center;">加载中...</p>')
		if(!$.trim(value) || !canSend)
			return
		canSend = false;

		$.ajax({
			type: 'POST',
			url: '/getGoogle',
			data: {
				keyword: encodeURI(value)
			},
			success: function(data){
				$('#app').html(data.html)
				canSend = true;
			},
			error: function(){
				$('#app').html('<p style="text-align:center;">加载失败，(js:我发的可能是个假ajax)。</p>')
				canSend = true;
			}
		})

	}
})