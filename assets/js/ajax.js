/*$(function(){

		//テーブル格納
		var table = $("#anime");

		var myD = new Date(); 
		//現在の年取得
		var myY = myD.getFullYear();
		//現在の月取得
		var myM = myD.getMonth() + 1;
		//選択されている期の値を取得
		var seasonVal = $("[name=season] option");

		//現在の年を選択した状態にする
			$("[name=year] option").filter(function(){
				return $(this).val() == myY;
			}).prop('selected', true);

			//今期を選択した状態にする
			switch(myM){
				case 1:
				case 2:
				case 3:
					seasonVal.filter(function(){
						return $(this).val() == 1;
					}).prop('selected', true);
					//1～3月だったら1期
					var myS = 1;
				break;
				case 4:
				case 5:
				case 6:
					seasonVal.filter(function(){
						return $(this).val() == 2;
					}).prop('selected', true);
					//4～6月だったら2期
					var myS = 2;
				break;
				case 7:
				case 8:
				case 9:
					seasonVal.filter(function(){
						return $(this).val() == 3;
					}).prop('selected', true);
					//7～9月だったら3期
					var myS = 3;
				break;
				case 10:
				case 11:
				case 12:
					seasonVal.filter(function(){
						return$(this).val() == 4;
					}).prop('selected', true);
					//10～12月だったら4期
					var myS = 4;
				break;
			}
		
      	/**
      	 * [Ajax ajax通信を行う]
      	 * @param {[type]} nowY [description]
      	 * @param {[type]} nowS [description]
      	 */
      	/*function Ajax(nowY,nowS) {
      		$.ajax({
				url: "http://api.moemoe.tokyo/anime/v1/master/" + nowY + "/" + nowS ,
				type: 'get',
				datatype: 'json',
			})
	  		.success(function(data){
	  			if(data == ""){
	  				//データが空っぽだった時の表示
					var emptyM = "<tr><td>該当する作品がありません</td></tr>";
	  				table.html(emptyM);
	  			}else{
	  				//テーブルの項目欄表示
      				var th = "\
      						<tr>\
      						<th>タイトル</th>\
      						<th>公式サイト</th>\
      						<th>twitter</th>\
      						<th>ハッシュタグ</th>\
      						<th>&nbsp;</th>\
      						</tr>";
	      			table.append(th);
	  				for(i=0; i<data.length; i++){
					//<tr><td>～</td></tr>にデータを入れて表示する
					var animeInfo = "\
									<tr>\
									<td>" + data[i].title + "</td>\
									<td>" + data[i].public_url + "</td>\
									<td>" + data[i].twitter_account + "</td>\
									<td>#" + data[i].twitter_hash_tag + "</td>\
									<td>" + data[i].twitter_account + "</td>\
									<td>" + '<img src="http://furyu.nazo.cc/twicon/' + data[i].twitter_account + '/bigger">' + "</td>\
									</tr>";
					table.append(animeInfo);
					}
	  			}
	  		})
			.error(function(){
				//読み込みに失敗した時の表示
				var errorM = "\
							<tr>\
							<td>読み込みに失敗しました</td>\
							</tr>";
				table.html(errorM);
			});
      	}
      	Ajax(myY,myS);

		/**
		 * [changeMenu メニューを変えた時の処理]
		 * @return {[type]} [description]
		 */
		/*function changeMenu() {
			$("[name=year],[name=season]").change(function(){
	      	//optionのvalue値を格納
	      	var y_val = $("[name=year]").val();
			var s_val = $("[name=season]").val();
	      	//テーブルのリセット
	      	table.html("");
	      	//ajax通信を実行する
	      	if(y_val == "" || s_val == ""){
	      		table.html(empty);
	      	}else{
	      		//Ajax通信を実行
	      		Ajax(y_val,s_val);
	      	}
		});	
	}
	changeMenu();	
});*/

/***************************************************************▼0629書き直し▼*************************************************************************************/
$(document).ready(function(){

/*
**アニメクラス
 */	

//クラス定義（コンストラクタ）
var Anime = function(op){

	//DOM
	this.table = $("#anime");
	this.seasonVal = $("[name=season] option");
	this.img = $('img');
	this.emptyM = "\<tr>\
					<td>該当する作品がありません</td>\
					</tr>";

	this.errorM = "\
					<tr>\
					<td>読み込みに失敗しました</td>\
					</tr>";	

	//現在の年月日
	this.myD = new Date();
	//現在の年
	this.myY = this.myD.getFullYear();
	//現在の月
	this.myM = this.myD.getMonth() + 1;
	//現在のクール（期）
	switch(this.myM){
   		case 1:
		case 2:
		case 3:this.myS = 1;//1～3月は1期
		break;

		case 4:
		case 5:
		case 6:this.myS = 2;//1～3月は2期
		break;

		case 7:
		case 8:
		case 9:this.myS = 3;//1～3月は3期
		break;

		case 10:
		case 11:
		case 12:this.myS = 4;//1～3月は4期
		break;
    }

};
    
    
Anime.prototype = {

	/**
	 * 初期化
	 * @return {[type]} [description]
	 */
	_init: function() {
		var self = this;
		
		//各メソッド呼び出し
		self._selectInit();
		self._changeMenu();
		self._ajax(self.myY,self.myS);
	},

	/**
	 * Ajax通信を実行
	 * @return {[type]} [description]
	 */
	_ajax: function(nowY,nowS) {
		var self = this;	

		$.ajax({
			url: "http://api.moemoe.tokyo/anime/v1/master/" + nowY + "/" + nowS ,
			type: 'get',
			datatype: 'json',
		})
  		.success(function(data){
  			if(data == ""){
  				//データが空っぽだった時の表示
  				self.table.html(self.emptyM);
  			}else{
  				//テーブルの項目欄表示
  				var th = "\
  						<tr>\
  						<th>タイトル</th>\
  						<th>公式サイト</th>\
  						<th>twitter</th>\
  						<th>ハッシュタグ</th>\
  						<th>&nbsp;</th>\
  						</tr>";
      			self.table.append(th);
  				for(i=0; i<data.length; i++){
				//<tr><td>～</td></tr>にデータを入れて表示する
				var animeInfo = "\
								<tr>\
								<td>" + data[i].title + "</td>\
								<td>" + data[i].public_url + "</td>\
								<td>" + data[i].twitter_account + "</td>\
								<td>#" + data[i].twitter_hash_tag + "</td>\
								<td>" + data[i].twitter_account + "</td>\
								<td>" + '<img src="http://furyu.nazo.cc/twicon/' + data[i].twitter_account + '/bigger">' + "</td>\
								</tr>";
				self.table.append(animeInfo);
				}
  			}
  		})
		.error(function(){
			//読み込みに失敗した時の表示
			self.table.html(self.errorM);
		});
	},

	/**
	 * ページ読み込み時の初期表示
	 * @return {[type]} [description]
	 */
	_selectInit: function() {
		var self = this;

		//現在の年を選択した状態にする
		$("[name=year] option").filter(function(){
			return $(this).val() == self.myY;
		}).prop('selected', true);

		//今期を選択した状態にする
		switch(self.myM){
			case 1:
			case 2:
			case 3:
				self.seasonVal.filter(function(){
					return $(this).val() == 1;
				}).prop('selected', true);
			break;

			case 4:
			case 5:
			case 6:
				self.seasonVal.filter(function(){
					return $(this).val() == 2;
				}).prop('selected', true);
			break;

			case 7:
			case 8:
			case 9:
				self.seasonVal.filter(function(){
					return $(this).val() == 3;
				}).prop('selected', true);
			break;

			case 10:
			case 11:
			case 12:
				self.seasonVal.filter(function(){
					return $(this).val() == 4;
				}).prop('selected', true);
			break;
		}
	},

	/**
	 * ドロップダウンリスト変更時の処理
	 * @return {[type]} [description]
	 */
	_changeMenu: function() {
		var self = this;

		$("[name=year],[name=season]").change(function(){
			var y_val = $("[name=year]").val();
			var s_val = $("[name=season]").val();
	      	//テーブルのリセット
	      	self.table.html("");
	      	//ajax通信を実行する
	      	if(y_val == "" || s_val == ""){
	      		self.table.html(self.emptyM);
	      	}else{
	      		//Ajax通信を実行
	      		self._ajax(y_val,s_val);
	      	}
		});	
	},

};

var anime = new Anime();

	anime._init();
   

});
