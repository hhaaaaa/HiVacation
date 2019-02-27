<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="do.join" name="joinForm" onsubmit="return join();" method="post">
		<table id="joinTable">
			<tr>
				<td class="joinTd">
					<div>
						<input id="joinid" name="hm_id" placeholder="&nbsp;&nbsp;ID" class="joinInputSmall" maxlength="15" autocomplete="off" autofocus="autofocus">
						<span id="joinIdOk" onsubmit="goCheckId();">ID확인</span>
					</div>
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<input id="joinpw" name="hm_pw" type="password" class="joinInput" placeholder="&nbsp;&nbsp;PW" maxlength="20">
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<input id="joinpw2" name="hm_pw2" type="password" class="joinInput" placeholder="&nbsp;&nbsp;PW확인" maxlength="20">
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<input id="joinname" name="hm_name" autocomplete="off" class="joinInput" placeholder="&nbsp;&nbsp;이름" maxlength="10">
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<div>
						<input id="joinPostNo" name="address1" readonly="readonly" placeholder="&nbsp;&nbsp;우편번호" class="joinInputSmall" autocomplete="off">
						<span id="joinAddressSearchButton">검색</span>
					</div>
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<input id="joinAddress" name="address2" readonly="readonly" placeholder="&nbsp;&nbsp;주소" autocomplete="off" class="joinInput">
				</td>
			</tr>
			<tr>
				<td class="joinTd">
					<input id="address" name="address3" autocomplete="off" class="joinInput" placeholder="&nbsp;&nbsp;상세주소">
				</td>
			</tr>
			<tr><td></td></tr>
			<tr>
				<td align="center" class="joinTd">
					<button id="joinDoButton">회원가입</button>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>