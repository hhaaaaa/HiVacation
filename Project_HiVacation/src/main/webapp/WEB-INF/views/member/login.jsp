<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="do.login" name="loginForm" method="post" onsubmit="return login();">
		<table id="loginDoTable">
			<tr>
				<td align="center" class="loginDoTd" colspan="2"><input
					id="hm_id" name="hm_id" autocomplete="off" autofocus="autofocus"
					placeholder="&nbsp;&nbsp;ID" maxlength="15"></td>
			</tr>
			<tr>
				<td align="center" class="loginDoTd" colspan="2"><input
					id="hm_pw" name="hm_pw" autocomplete="off"
					placeholder="&nbsp;&nbsp;PW" maxlength="20"
					type="password"></td>
			</tr>
			<tr>
				<td></td>
			</tr>
			<tr>
				<td align="center" class="loginDoTdSmall"
					style="font-size: 10pt; height: 20px;"><input type="checkbox"
					name="hm_auto">자동로그인</td>
				<td align="center" class="loginDoTdSmall" rowspan="2">
					<button id="loginButton">로그인</button>
				</td>
			</tr>
	</form>
			<tr>
				<td align="center" style="width: 50%;">
					<button id="joinButton" onclick="goJoin();">회원가입</button>
				</td>
			</tr>
		</table>
</body>
</html>