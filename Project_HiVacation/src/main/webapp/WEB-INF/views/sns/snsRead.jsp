<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
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
					<td align="right" colspan="3"
						style="padding-right: 20px; height: 25px;"><span
						id="snsUdpateSpan" onclick="goSNSUpdate(${selectSNS.hs_no });">수정</span>
						<span>&nbsp;</span> <span id="snsDeleteSpan"
						onclick="doSNSDelete(${selectSNS.hs_no });">삭제</span></td>
				</tr>

			</c:if>
			<tr>
				<td align="center" class="snsReadMenu">제목</td>
				<td id="snsReadTitle">${selectSNS.hs_title }</td>
				<td align="right" id="snsReadDate"><fmt:formatDate
						value="${selectSNS.hs_date }" pattern="yyyy-MM-dd a hh:mm" />&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<td colspan="2" style="border-bottom: black solid 2px;"></td>
				<td align="center" id="snsReadId">${selectSNS.hs_id }&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<td colspan="3"><input type="hidden" name="hs_no"
					value="${selectSNS.hs_no }"></td>
			</tr>
			<c:forEach items="${selectSNS.hv_image }" var="Simg">
				<tr>
					<td colspan="3" align="center"><img
						src="resources/img/${Simg.hi_fname }"
						style="width: 200px; height: 200px;"></td>
				</tr>
			</c:forEach>
			<tr>
				<td align="center" id="snsReadText" colspan="3">
					${selectSNS.hs_text}</td>
			</tr>
			<tr>
				<td align="center" id="snsReadReplyWrite" colspan="3"><input
					id="snsReadReplyInput" name="hr_text"
					placeholder="&nbsp;&nbsp;댓글 입력">
					<button id="snsReadReplyButton">입력</button></td>
			</tr>
			<tr>
				<td align="center"
					style="width: 100%; border-bottom: black solid 2px; padding-bottom: 20px;"
					colspan="3"><c:forEach items="${snsReplys }" var="sr">
						<table class="replyTable">
							<tr>
								<td align="center" class="replyId" class="snsReadReply">
									${sr.hr_id }</td>
								<td class="replyText" class="snsReadReply">${sr.hr_text }</td>
								<td align="center" class="replyDate" class="snsReadReply">
									<fmt:formatDate value="${sr.hr_date }"
										pattern="yyyy-MM-dd a hh:mm" />
								</td>

								<c:choose>
									<c:when test="${sessionScope.loginMember.hm_id == sr.hr_id }">
										<td class="replyUpdateButton"><a class="snsReplyUpdateButton" rel="${sr.hr_no}">수정</a></td>
										<td align="center" class="replyDeleteButton"
											class="snsReadReply"><a class="snsReplyDeleteButton"
											rel="${sr.hr_no }">삭제</a></td>
									</c:when>
									<c:otherwise>
										<td class="replyUpdateButton"></td>
										<td align="center" class="replyDeleteButton"
											class="snsReadReply"></td>
									</c:otherwise>
								</c:choose>
						</table>
					</c:forEach></td>
			</tr>
		</table>
	</form>
</body>
</html>