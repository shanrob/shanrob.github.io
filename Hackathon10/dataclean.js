


d3.csv("tryingForNew.csv", function(reportData){
	var result = [];

	for(var i = 0; i < reportData.length; i++){
		for(var j = 0; j < reportData.length; j++){
			var count = //countMetdaID(tag[i], tag[j])
			var obj = {source: tag[i], target: tag[j], value: count};
			result.push(obj);
		}
	}

	function countMetdaIDsWithCorrTags(tagi, tagj){
		var count = 0;
		for(var k=0; k < reportData.length; k++){
			if(lookForMetaID(reportData[k]["MetaID"], tagi) && lookForMetaID(reportData[k]["MetaID"], tagj){
				count++;
			})
		}
		return count;
	};

	function lookForMetaID(MetaID, tag){
		for(var h = 0; h < reportData.length; h++){
			if(reportData[h]["MetaID"] == MetaID && reportData[h]["tag"] == tag){
				return true;
			}
		}
		return false;
	};

	console.log(result);

}

