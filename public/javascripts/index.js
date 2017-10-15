$(function() {
	
	$('#search').click(function(){
		$('.search-wrap').submit();
	});
	$('#search-input').keydown(function(e){
		if(e.keyCode == '13')
			$('.search-wrap').submit();
	});

	var canSend = true;

	function render(keyword){
		var value = $('#search-input').val();

		if(artTemplate.keyword){
			$('#search-input').val(value = artTemplate.keyword);
			artTemplate.keyword = '';
		}

		$('#app').html('<p style="text-align:center;">加载中...</p>')

		if(!$.trim(value) || !canSend)
			return
		canSend = false;

		$.ajax({
			type: 'GET',
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
	if(artTemplate.keyword){
		render();
	}
})