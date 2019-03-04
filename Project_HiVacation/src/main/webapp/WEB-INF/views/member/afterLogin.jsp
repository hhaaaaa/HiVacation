<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="afterLoginMenuDiv">
		<span>
			<img src="resources/img/plane_icon.jpg" id="afterLoginMyImg">
		</span>
		<span id="myNameSpan">${sessionScope.loginMember.hm_name }</span>
	</div>
	<table id="myMenuTable">
		<tr><td></td></tr>
		<tr>
			<td align="center" class="goMyMenu">MY PAGE</td>
		</tr>
		<tr>
			<td align="center" class="goMyMenu">캘린더</td>
		</tr>
		<tr>
			<td align="center" class="goMyMenu" onclick="goUpdate();">정보수정</td>
		</tr>
		<tr>
			<td align="center" class="goMyMenu" onclick="doLogout();">로그아웃</td>
		</tr>
	</table>
</body>
</html>