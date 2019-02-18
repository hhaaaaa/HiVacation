<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hi Vacation</title>
<link rel="stylesheet" href="resources/css/index.css">
<link rel="stylesheet" href="resources/css/member/login.css">
<link rel="stylesheet" href="resources/css/member/join.css">
<script type="text/javascript" src="resources/js/jquery.js"></script>
<script type="text/javascript" src="resources/js/validCheckHha.js"></script>
<script type="text/javascript" src="resources/js/HVjQuery.js"></script>
<script type="text/javascript" src="resources/js/go.js"></script>
<script type="text/javascript"> 
	$(function() {
		
	});
</script>
</head>
<body>
	<table id="totalPageTable">
		<tr>
			<td align="center">
				<span id="borderWhiteSpan"></span>
				<table id="aboutUsTable">
					<tr>
						<td align="center" onclick="goPageInfo();">저희는</td>
					</tr>
				</table>
				<table id="loginTable">
					<tr>
						<td align="center" id="login" onclick="goLogin();">로그인</td>
						<td align="center" id="join" onclick="goJoin();">회원가입</td>
					</tr>
				</table>
				<table id="titleTable">
					<tr>
						<td align="center">
							<span id="title" onclick="goHome();">
								<img src="resources/img/title.jpg" id="titleImg">
							</span>
						</td>
					</tr>
				</table>
				
				<!-- 메뉴?? -->
				
				<table id="contentTable">
					<tr>
						<td align="center">
							<table id="content">
								<tr>
									<td align="center">
										<jsp:include page="${contentPage }"/>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>