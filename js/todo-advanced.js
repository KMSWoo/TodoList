$(function  () {
	if (!(window.localStorage)) {
		alert("您的浏览器不支持存储数据，请换一个更高级的浏览器或者及时备份数据！")
	};

	(function  () {
		if (localStorage.length) {
			for (var i = 0; i < localStorage.length; i++) {
				$('.list ol').append('<li>'+localStorage.key(i)+'&nbsp;<a href="#"><img src="img/del.png" /></a></li>');	
			};
		};
	})();

	$('input').keydown(function(event) {
		if (event.keyCode === 13) {
			if ($('input').val() && $.trim($('input').val())!='') {
				$('.list ol').append('<li>'+$('input').val()+'&nbsp;<a href="#"><img src="img/del.png" /></a></li>');
				storageAdd($('input').val());
			};
			$('input').val('');			
		};
		countLeft();
	});

	$('.list ol').on('click', 'li a', function(event) {
		event.preventDefault();
		// alert(typeof($(this).parent().text())); 
		storageRemove($(this).parent().text());
		var $del = $(this).parent().css('text-decoration','line-through');
		$('.delete ol').append($del.prop('outerHTML'));
		$del.remove();
		countDel();
		countLeft();
	});

	$('.delete ol').on('click', 'li a', function(event) {
		event.preventDefault();
		$(this).parent().remove();
	});

	function storageAdd (val) {
		localStorage.setItem(val,null);
	}

	function storageRemove (val) {
		for (var i = 0; i < localStorage.length; i++) {
			if ($.trim(val) === $.trim(localStorage.key(i))){//$.trim(val)这个bug调试了半天
				localStorage.removeItem(localStorage.key(i));
			};
		};
	}

	function countLeft () {
		var len = $('.list ol li').length;
		$('.left').text(len+' items left!');
	}

	function countDel () {
		var len = $('.delete ol li').length;
		if (len) {
			$('.del').text(len+' items completed!');
		}
	}
});