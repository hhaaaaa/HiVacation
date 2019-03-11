<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table id="snsReadTable">
		<tr>
			<td align="right" colspan="3" style="padding-right: 20px; height: 25px; border-bottom: grey solid 1px;">
				<span id="snsUdpateSpan">수정</span>
				<span>&nbsp;</span>
				<span id="snsDeleteSpan">삭제</span>
			</td>
		</tr>
		<tr>
			<td align="center" class="snsReadMenu">제목</td>
			<td id="snsReadTitle">
				제목자리
			</td>
			<td align="right" id="snsReadDate">
				날짜자리&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
		<tr>
			<td align="right" colspan="3" id="snsReadId">
				ID자리&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
		<tr>
			<td align="center" id="snsReadText" colspan="3">
				내용자리
			</td>
		</tr>
		<tr>
			<td align="center" id="snsReadReplyWrite" colspan="3">
				<input id="snsReadReplyInput" placeholder="&nbsp;&nbsp;댓글 입력">
				<button id="snsReadReplyButton">입력</button>
			</td>
		</tr>
		<tr>
			<td align="center" id="snsReadReply" colspan="3">
				댓글들자리
			</td>
		</tr>
	</table>
</body>
</html>