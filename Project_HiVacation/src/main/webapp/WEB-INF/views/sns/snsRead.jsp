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
	<form action="do.snsreply.write">
	<table id="snsReadTable">
		<c:if test="${sessionScope.loginMember.hm_id == selectSNS.hs_id }">
			<tr>
			<td align="right" colspan="3" style="padding-right: 20px; height: 25px; border-bottom: grey solid 1px;">
				<span id="snsUdpateSpan" onclick="goSNSUpdate(${selectSNS.hs_no });">수정</span>
				<span>&nbsp;</span>
				<span id="snsDeleteSpan" onclick="doSNSDelete(${selectSNS.hs_no });">삭제</span>
			</td>
		</tr>
		
		</c:if>
		<tr>
			<td align="center" class="snsReadMenu">제목</td>
			<td id="snsReadTitle">
				${selectSNS.hs_title }
			</td>
			<td align="right" id="snsReadDate">
				<fmt:formatDate value="${selectSNS.hs_date }" pattern="yyyy-MM-dd a hh:mm"/>&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
		</tr>
		<tr>
			<td align="right" colspan="3" id="snsReadId">
				${selectSNS.hs_id }&nbsp;&nbsp;&nbsp;&nbsp;
			</td>
			<td><input type="hidden" name="hs_no" value="${selectSNS.hs_no }"></td>
		</tr>
		<c:forEach items="${selectSNS.hv_image }" var="Simg">
			<tr>
				<td>
					<img src="resources/img/${Simg.hi_fname }" style="width : 200px; height : 200px;" >
				</td>
			</tr>
		</c:forEach>
		<tr>
			<td align="center" id="snsReadText" colspan="3">
				${selectSNS.hs_text}
			</td>
		</tr>
		<tr>
			<td align="center" id="snsReadReplyWrite" colspan="3">
				<input id="snsReadReplyInput" name="hr_text" placeholder="&nbsp;&nbsp;댓글 입력">
				<button id="snsReadReplyButton">입력</button>
			</td>
		</tr>
		<c:forEach items="${snsReplys }" var="sr">
			<tr>
			<td align="center" class="snsReadReply">
				${sr.hr_id }
			</td>
			<td class="snsReadReply">${sr.hr_text }</td>
			<td align="right" class="snsReadReply">
				<fmt:formatDate value="${sr.hr_date }" pattern="yyyy-MM-dd a hh:mm"/>
			</td>
			<td align="center" class="snsReadReply"><a class="snsReplyDeleteButton" rel="${sr.hr_no }">x</a></td>
		</tr>			
		</c:forEach>
	</table>
	</form>
</body>
</html>