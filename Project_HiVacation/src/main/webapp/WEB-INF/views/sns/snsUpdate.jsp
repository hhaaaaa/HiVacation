<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>   
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>           
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="snsWriteTotalDiv">
		<div id="goSnsListDiv" onclick="goSns();">목록으로</div>
		<form action="do.sns.update" name="snsWriteForm" onsubmit="return snsUpdate();" method="post" enctype="multipart/form-data">
			<table id="snsWriteTable">
				<tr><td></td></tr>
				<tr>
					<td align="center" class="snsWriteMenu" style="border-top: black solid 1px;">제목</td>
					<td align="center" class="snsWriteMenu" style="border-top: black solid 1px; padding-left: 40px;">
						<input id="snsTitle" name="hs_title" autocomplete="off" autofocus="autofocus" style="" value="${selectSNS.hs_title }">
					</td>
				</tr>
				<tr><td><input type="hidden" value="${selectSNS.hs_no }" name="hs_no"></td></tr>
				<tr>
					<td align="center" class="snsWriteMenu">내용</td>
					<td align="center" class="snsWriteMenu" style="padding-left: 40px;">
						<textarea id="snsText" name="hs_text" >${selectSNS.hs_text }</textarea>
					</td>
				</tr>
				<tr>
					<td align="center" class="snsWriteMenu">
						<img src="resources/img/plus_button.png" style="width: 35px;" id="addUpdateFile">
					</td>
					<td align="center" class="snsWriteMenu" style="padding-left: 40px;" id="fileTD">
						<table>
							<c:forEach items="${selectSNS.hv_image }" var="si">
								<tr>
									<td>
										${si.hi_fname }
									</td>
									<td>&nbsp;&nbsp;&nbsp;<a rel="${si.hi_no }" class="imgDeletButton">x</a></td>
								</tr>
							</c:forEach>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<input type="hidden" id="updateFileIndex" name="updateFileI">
					</td>
				</tr>
				<tr><td><br></td></tr>
				<tr>
					<td align="right" colspan="2">       
						<button id="snsWriteButton">수정</button>
					</td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>