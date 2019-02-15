// 잘못되면 true, 정상이면 false 

// <input>을 넣어주면 거기에 글자가 없는지 체크해줄 함수
// 없으면 true, 있으면 false 리턴
function isEmpty(field) {
		/*if (!field.value) {
			return true;
		}
		return false;*/
	return (!field.value);
}

// <input>, 최소 글자수를 넣어주면 체크해줄 함수
// 최소글자수보다 짧으면 true, 길면 false 리턴
function lessThan(field, min) {
		/*if (field.value.length < min) {
			return true;
		}
		return false;*/
	return (field.value.length < min);
}

// <input> 넣어주면 거기에 한글/특수문자 있는지 체크해줄 함수
// 한글/특수문자가 들어있으면 true, 없으면 false 리턴
function containKS(field) {
	var str = "1234567890qwertyuiopasdfghjklzxcvbnm" +
			"QWERTYUIOPASDFGHJKLZXCVBNM@-_.";	

	for (var i = 0; i < field.value.length; i++) {
		if (str.indexOf(field.value[i]) == -1) {
			return true;
		}
	}
	return false;
}

// <input> 2개 넣어서, 그 2개 값 다른지 체크해줄 함수
// 다르면 true, 같으면 false
function notEquals(field1, field2) {		// 비번체크 (pwCheck)
		/*if (field1.value != field2.value) {
			return true;
		}
		return false;*/
	return (field1.value != field2.value);
}

// <input>, 허용할 문자열세트를 넣었을 때 
// 그것들을 포함하고 있지 않으면 true, 포함하고 있으면 false
function notContain(field, set) {
	for (var i = 0; i < set.length; i++) {
		if (field.value.indexOf(set[i]) != -1) {
			return false;
		}
	}
	return true;
}

// <input>을 넣어주면 숫자만 있는지
// 불순물이 있으면 true, 아니면 false
function isNotNumber(field) {
	return isNaN(field.value);	// isNaN() : 숫자가 아닌게 들어있으면 true 리턴해주는 함수
}

// <input>, 파일확장자(png)를 넣어주면
// value가 확장자로 안끝나면 true, 끝나면 false
// toLowerCase() : 다 소문자로
// endsWith(type) : type으로 끝나는지  -> 옛날버전 익스플로러는 지원하지 않음!
function isNotType(field, type) {
	return (field.value.toLowerCase().indexOf("." + type) == -1);
	
	//return (!field.value.toLowerCase().endsWith("." + type));
}





