<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"> 
<title>Insert title here</title>
</head>
<body>
		<table id="updateTable">
	<form action="do.update" name="updateForm" method="post" onsubmit="return update();">
			<tr>
				<td class="updateTd" colspan="2">
					<div>
						<span id="updateid" class="updateInputSmall">&nbsp;${sessionScope.loginMember.hm_id }</span>
					</div>
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<input id="updatepw" name="hm_pw" type="password" class="updateInput" placeholder="&nbsp;&nbsp;PW" maxlength="">
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<input id="updatepw2" name="hm_pw2" type="password" class="updateInput" placeholder="&nbsp;&nbsp;PW확인" maxlength="">
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<input id="updatename" name="hm_name" autocomplete="off" class="updateInput" placeholder="&nbsp;&nbsp;이름" maxlength="" value="${sessionScope.loginMember.hm_name }">
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<div>
						<input id="updatePostNo" name="address1" readonly="readonly" placeholder="&nbsp;&nbsp;우편번호" class="updateInputSmall" autocomplete="off" value="${addr1 }">
						<span id="updateAddressSearchButton">검색</span>
					</div>
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<input id="updateAddress" name="address2" readonly="readonly" placeholder="&nbsp;&nbsp;주소" autocomplete="off" class="updateInput" value="${addr2 }">
				</td>
			</tr>
			<tr>
				<td class="updateTd" colspan="2">
					<input id="address" name="address3" autocomplete="off" class="updateInput" placeholder="&nbsp;&nbsp;상세주소" maxlength="" value="${addr3 }">
				</td>
			</tr>
			<tr><td colspan="2"></td></tr>
			<tr>
				<td class="updateTd2">
					<button id="updateDoButton">정보수정</button>
				</td>
	</form>
				<td class="updateTd2">
					<button id="withdrawButton" onclick="doWithdraw('${sessionScope.loginMember.hm_pw }');">탈퇴</button>
				</td>
			</tr>
		</table>
		<div id="withdrawPwCheck">
			<h3>정말로 탈퇴하시겠습니까?</h3>
			PW입력 <input id="wpcPW" type="password"><p>
			<span id="withdrawOK" style="cursor: pointer;">확인</span>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<span onclick="goUpdate();" style="cursor: pointer;">취소</span><p>
		</div>
</body>
</html>