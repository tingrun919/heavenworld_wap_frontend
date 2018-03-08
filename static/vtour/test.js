function update_comm_ele(p1, p2) {
	$("#comment-athv").attr("data-ath", p1).attr("data-atv", p2)
	console.log(p1, 'p1')
	console.log(p2, 'p2')
}
function getComment() {
	var krpano = document.getElementById('krpanoSWFObject');
	//取得当前scene
	var s = krpano.get("scene[get(xml.scene)].name");
	//ajax开始=======================================
	console.log(s,'snams')
	$.ajax({
		type: "get",
		url: 'http://192.168.10.196:8080/banaworld_show/nopano/selListPray',
		dataType: "json",
		data: { panoid: "1", scenename: s },
		success: function (data) {
			var data = data.data
			for (var i = 0; i < data.length; i++) {
				var commname = "userComm_" + data[i].prayId;
				krpano.call(//显示可拖动的评论热点
					"addhotspot(" + commname + ");" +
					"set(hotspot[" + commname + "].url,%SWFPATH%/blessing.png);" +
					"set(hotspot[" + commname + "].ath," + data[i].prayLongitude + ");" +
					"set(hotspot[" + commname + "].atv," + data[i].prayDimension + ");" +
					"set(hotspot[" + commname + "].scale,.2);" +
					"set(hotspot[" + commname + "].onclick,js(update_comm_ele(get(ath),get(atv))));"
				);
			}
		}
	});
	//ajax开始=======================================end
}
function pausesound(){
	console.log(11112312312312312321)
}