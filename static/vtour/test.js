//更新祈福位置
function update_comm_ele(p1, p2) {
	$("#comment-athv").attr("data-ath", p1).attr("data-atv", p2)
}
//获取某scene下的所有祈福
function getComment() {
	var prayId = window.location.pathname
	prayId = prayId.substr(prayId.length-1,1)
	var krpano = document.getElementById('krpanoSWFObject');
	//取得当前scene
	var s = krpano.get("scene[get(xml.scene)].name");
	//ajax开始=======================================
	$.ajax({
		type: "get",
		url: 'http://192.168.10.196:8080/banaworld_show/nopano/selListPray',
		dataType: "json",
		data: { panoid: prayId, scenename: s },
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
					"set(hotspot[" + commname + "].onclick,js(blessing_detail("+data[i].prayId+")));"
				);
			}
		}
	});
	//ajax开始=======================================end
}
function blessing_detail(prayId){
	$("#blessingDetail").attr("data-prayid",prayId)
	$("#blessingBtn").trigger("click");
}	