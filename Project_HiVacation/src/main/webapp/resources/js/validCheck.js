function join() {
	var hm_id = document.joinForm.hm_id;
	var hm_pw = document.joinForm.hm_pw;
	var hm_pw2 = document.joinForm.hm_pw2;
	var hm_name = document.joinForm.hm_name;
	var hm_address1 = document.joinForm.address1;
	var hm_address3 = document.joinForm.address3;
	if (isEmpty(hm_id) || containKS(hm_id) || !isNotNumber(hm_id) 
			|| lessThan(hm_id, 7) ||$("#joinIdOK").text()=="id중복") {
		alert("ID를 다시 입력해주세요.");
		hm_id.value = "";
		hm_id.focus();
		return false;
	} else if (isEmpty(hm_pw) || notContain(hm_pw, "0123456789") || lessThan(hm_pw, 7)) {
		alert("PW를 다시 입력해주세요.");
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} else if (isEmpty(hm_pw2) || notContain(hm_pw2, "0123456789") || lessThan(hm_pw2, 7)) {
		alert("PW 확인란을 다시 입력해주세요.");
		hm_pw2.value = "";
		hm_pw2.focus();
		return false;
	} else if (notEquals(hm_pw, hm_pw2)) {
		alert("PW와 PW확인이 일치하지 않습니다.");
		hm_pw2.value = "";
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} else if (isEmpty(hm_name) || !notContain(hm_name, "1234567890")) {
		alert("이름을 다시 입력해주세요.");
		hm_name.value = "";
		hm_name.focus();
		return false;
	} else if (isEmpty(hm_address1)) {
		alert("우편번호를 선택해주세요");
		return false;
	} else if (isEmpty(hm_address3)) {
		alert("상세 주소를 입력해주세요.");
		hm_address3.value = "";
		hm_address3.focus();
		return false;
	} 
	return true;
}


function login() {
	var hm_id = document.loginForm.hm_id;
	var hm_pw = document.loginForm.hm_pw;
	
	if (isEmpty(hm_id)) {
		alert("ID를 입력해주세요.");
		hm_id.value = "";
		hm_id.focus();
		return false;
	} else if (isEmpty(hm_pw)) {
		alert("PW를 입력해주세요.");
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} 
	return true;
}

function update() {
	var hm_pw = document.updateForm.hm_pw;
	var hm_pw2 = document.updateForm.hm_pw2;
	var hm_name = document.updateForm.hm_name;
	var hm_address1 = document.updateForm.address1;
	var hm_address3 = document.updateForm.address3;
	if (isEmpty(hm_pw) || containKS(hm_pw)) {
		alert("PW를 다시 입력해주세요.");
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} else if (isEmpty(hm_pw2)) {
		alert("PW확인을 다시 입력해주세요.");
		hm_pw2.value = "";
		hm_pw2.focus();
		return false;
	} else if (notEquals(hm_pw, hm_pw2)) {
		alert("PW와 PW확인이 다릅니다.");
		hm_pw2.value = "";
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} else if (isEmpty(hm_name) || !notContain(hm_name, "1234567890")) {
		alert("이름을 다시 입력해주세요.");
		hm_name.value = "";
		hm_name.focus();
		return false;
	} else if (isEmpty(hm_address1)) {
		alert("우편번호를 선택해주세요");
		return false;
	} else if (isEmpty(hm_address3)) {
		alert("상세 주소를 입력해주세요.");
		hm_address3.value = "";
		hm_address3.focus();
		return false;
	} 
	return true; 
}



function snsWrite() {
	var hs_title = document.snsWriteForm.hs_title;
	var hs_text = document.snsWriteForm.hs_text;
	
	if (isEmpty(hs_title)) {
		alert("제목을 입력해주세요.");
		hs_title.value = "";
		hs_title.focus();
		return false;
	} else if (isEmpty(hs_text)) {
		alert("내용을 입력해주세요.");
		hs_text.value = "";
		hs_text.focus();
		return false;
	} 
	return true;
}