/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 14:41:07 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-02-07 14:41:07 
 */


export function show_comment() {
	var krpano = document.getElementById('krpanoSWFObject');
	console.log(3333)
	krpano.call(//显示可拖动的评论热点
		"addhotspot(spot1);" +
		"set(hotspot[spot1].url,%SWFPATH%/blessing.png);" +
		"set(hotspot[spot1].ath,get(view.hlookat));" +
		"set(hotspot[spot1].atv,get(view.vlookat));" +
		"set(hotspot[spot1].scale,.2);" +
		"set(hotspot[spot1].ondown,draghotspot());"
	);
}
	