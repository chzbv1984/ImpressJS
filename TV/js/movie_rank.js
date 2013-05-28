function get_json(filename){
     $.getJSON(filename,function(data){		   
		   var fields=data.general.fields;
		   var caption=data.general.caption;
		   var table_id=data.general.id;
		   var table_class=data.general.class;
		   var table_tr=data.data;
		   
		   $("#rank_div").append('<table id="'+table_id+'" class="'+table_class+'"><caption>'+caption+'</caption><tr id="th"></tr><tbody id="tbody"></tbody></table>');
		   var td_class=new Array();
		   for(j=0;j<=fields.length-1;j++){//表头			   
			   $("#th").append('<th class="'+makePy(fields[j])+'">'+fields[j]+'</th>');
		       td_class.push(makePy(fields[j]));//添加类
		   }
		   
		   for(k=0;k<=table_tr.length-1;k++){
			   var each_tr='';
			   for(m=0;m<=table_tr[k].length-1;m++){
				   each_tr=each_tr+'<td class="'+td_class[m]+'">'+table_tr[k][m]+'</td>'
			   }
			   $("#tbody").append('<tr>'+each_tr+'</tr>');
		   }
		   $("td.DBYM,td.IMDBYM").each(function(){
				var page=$(this).attr('class');
				if(page=='DBYM'){t='从豆瓣打开';}else{t='从IMDb打开';}
				$(this).find('a').attr({title:t,target:"_blank"});
		   });
		   $('td.YK').each(function(){
				var word=$(this).parent().find('td.MC').html();
				if(word.indexOf('>')>0){
					var s=word.indexOf('>'); var end=word.indexOf('<',2);
					word=word.substring(s,end);
				}
				$(this).html('<a class="search" target="_blank" title="搜索此部电影" href="http://www.baidu.com/baidu?wd='+word+'">搜索</a>');
		   });
		   $('td.DBPF').each(function(){
			      var douban_rate=parseFloat($(this).html());
			      var imdb_rate=parseFloat($(this).prev().prev().prev().prev().html());
			      if(douban_rate>imdb_rate){
					direction='up.png';
			      }else if(douban_rate<imdb_rate){
					direction='down.png';
			      } else {
					direction='right.png';
			      }
			      $(this).css('background','url(images/'+direction+') no-repeat 65% 9px');
		   });
		   //$("a.movie_title").click(function(){return false;});
		   $("a.movie_title").attr('target','_blank');
		   $("table tr:even").css('background-color','#E1E4E8');
		   $("#loading").hide();
	   }); 
   }
