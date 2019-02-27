function join() {
	var hm_id = document.joinForm.hm_id;
	var hm_pw = document.joinForm.hm_pw;
	var hm_pw2 = document.joinForm.hm_pw2;
	var hm_name = document.joinForm.hm_name;
	var hm_address1 = document.joinForm.address1;
	var hm_address3 = document.joinForm.address3;
	if (isEmpty(hm_id) || containKS(hm_id)||$("#joinIdOK").text()=="id중복") {
		alert("ID를 다시 입력해주세요.");
		hm_id.value = "";
		hm_id.focus();
		return false;
	} else if (isEmpty(hm_pw) || containKS(hm_pw)) {
		alert("PW를 다시 입력해주세요.");
		hm_pw.value = "";
		hm_pw.focus();
		return false;
	} else if (isEmpty(hm_pw2) || containKS(hm_pw2)) {
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