<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="snsWriteTotalDiv">
		<form action="do.sns.write" name="snsWriteForm" onsubmit="" method="post">
			<table id="snsWriteTable">
				<tr><td></td></tr>
				<tr>
					<td align="center" class="snsWriteMenu" style="border-top: black solid 1px;">제목</td>
					<td align="center" class="snsWriteMenu" style="border-top: black solid 1px; padding-left: 40px;">
						<input id="snsTitle" name="hs_title" autocomplete="off" autofocus="autofocus" style="">
					</td>
				</tr>
				<tr>
					<td align="center" class="snsWriteMenu">내용</td>
					<td align="center" class="snsWriteMenu" style="padding-left: 40px;">
						<textarea id="snsText" name="hs_text"></textarea>
					</td>
				</tr>
				<tr>
					<td align="center" class="snsWriteMenu">사진</td>
					<td align="center" class="snsWriteMenu" style="padding-left: 40px;">
						<input type="file" id="snsImage" name="hs_img">
					</td>
				</tr>
				<tr><td><br></td></tr>
				<tr>
					<td align="right" colspan="2"> 
						<button id="snsWriteButton">글쓰기</button>
					</td>
				</tr>
			</table>
		</form>
		<div id="goSnsListDiv" onclick="goSns();">목록으로</div>
	</div>
</body>
</html>