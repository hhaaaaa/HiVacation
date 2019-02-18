<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table id="loginDoTable">
		<tr>
			<td align="center" class="loginDoTd" colspan="2">
				<input id="id" autocomplete="off" autofocus="autofocus" placeholder="&nbsp;&nbsp;ID">
			</td>
		</tr>
		<tr>
			<td align="center" class="loginDoTd" colspan="2">
				<input id="pw" autocomplete="off" placeholder="&nbsp;&nbsp;PW">
			</td>
		</tr>
		<tr><td></td></tr>
		<tr>
			<td align="center" class="loginDoTdSmall" style="font-size: 10pt;">
				<input type="checkbox">자동로그인
			</td>
			<td align="center" class="loginDoTdSmall" rowspan="2">
				<button id="loginButton">로그인</button>
			</td>
		</tr>
		<tr>
			<td align="center" style="width: 50%;">
				<button id="joinButton" onclick="goJoin();">회원가입</button>
			</td>
		</tr>
	</table>
</body>
</html>