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
		$('#app').html("<p>加载中...</p>")
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
				$('#app').html("<p>加载失败</p>")
				canSend = true;
			}
		})

	}
})