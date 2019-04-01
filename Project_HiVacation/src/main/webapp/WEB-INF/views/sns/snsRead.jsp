<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body> 
	<form action="do.snsreply.write">
		<table id="snsReadTable">
			<tr>
				<td style="padding-left: 20px; height: 25px; padding-bottom: 10px;">
					<span id="snsListSpan" onclick="goSns();">목록으로</span>
				</td>
				<c:if test="${sessionScope.loginMember.hm_id == selectSNS.hs_id }">
					<td align="right" colspan="4" style="padding-right: 20px; height: 25px; padding-bottom: 10px;">
						<span id="snsUdpateSpan" onclick="goSNSUpdate(${selectSNS.hs_no });">수정</span>
						<span id="snsDeleteSpan" onclick="doSNSDelete(${selectSNS.hs_no });">삭제</span>
					</td>
				</c:if>
			</tr>
			<tr>
				<td align="center" class="snsReadMenu" rowspan="2">제목</td>
				<td id="snsReadTitle" rowspan="2" colspan="2">${selectSNS.hs_title }</td>
				<td align="center" class="snsReadMenu" style="border-top: black solid 2px; border-bottom: none;">글쓴이</td>
				<td align="center" id="snsReadId">
					${selectSNS.hs_id }&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<td align="center" class="snsReadMenu" style="border-top: none;">날짜</td>
				<td align="right" id="snsReadDate">
					<fmt:formatDate value="${selectSNS.hs_date }" pattern="yyyy-MM-dd a hh:mm" />&nbsp;&nbsp;&nbsp;&nbsp;
				</td>
			</tr>
			<tr>
				<td colspan="5">
					<input type="hidden" name="hs_no" value="${selectSNS.hs_no }">
				</td>
			</tr>
			<tr><td style="padding-top: 10px;" colspan="5">&nbsp;</td></tr>
			<c:choose>
				<c:when test="${fn:length(selectSNS.hv_image) > 0 }">
					<tr>
						<td colspan="2" align="center">
							<c:forEach items="${selectSNS.hv_image }" var="Simg">
								<img src="resources/img/${Simg.hi_fname }" style="max-width: 300px; max-height: 300px; cursor: pointer;" 
										onclick="doImgPop('resources/img/${Simg.hi_fname }')"><br>
							</c:forEach>
						</td>
						<td align="left" valign="top" class="snsReadText" colspan="3" style="padding-left: 20px;">${selectSNS.hs_text}</td>
					</tr>
				</c:when>
				<c:otherwise>
					<tr>							
						<td align="center" valign="top" class="snsReadText" colspan="5">${selectSNS.hs_text}</td>
					</tr>
				</c:otherwise>
			</c:choose>
			<tr><td style="padding-bottom: 10px; border-bottom: black solid 1px;" colspan="5">&nbsp;</td></tr>
			<c:if test="${sessionScope.loginMember !=null }" >
				<tr>
					<td align="center" id="snsReadReplyWrite" colspan="5">
						<input id="snsReadReplyInput" name="hr_text" placeholder="&nbsp;&nbsp;댓글 입력" autocomplete="off">
						<button id="snsReadReplyButton">입력</button>
					</td>
				</tr>
			</c:if>
			<tr>
				<td align="center" style="width: 100%; border-bottom: black solid 2px; padding-top: 20px; padding-bottom: 20px;" colspan="5">
					<c:forEach items="${snsReplys }" var="sr">
						<table class="replyTable">
							<tr>
								<td align="center" class="replyId" class="snsReadReply" style="font-weight: 900;">
									${sr.hr_id }
								</td>
								<td class="replyText" class="snsReadReply">
									${sr.hr_text }
								</td>
								<td align="center" class="replyDate" class="snsReadReply">
									<fmt:formatDate value="${sr.hr_date }" pattern="yyyy-MM-dd a hh:mm" />
								</td>

								<c:choose>
									<c:when test="${sessionScope.loginMember.hm_id == sr.hr_id }">
										<td class="replyUpdateButton"><a class="snsReplyUpdateButton" rel="${sr.hr_no}">수정</a></td>
										<td align="center" class="replyDeleteButton" class="snsReadReply"><a class="snsReplyDeleteButton" rel="${sr.hr_no }">삭제</a></td>
									</c:when>
									<c:otherwise>
										<td class="replyUpdateButton"></td>
										<td align="center" class="replyDeleteButton" class="snsReadReply"></td>
									</c:otherwise>
								</c:choose>
							</tr>
						</table>
					</c:forEach>
				</td>
			</tr>
		</table>
	</form>
</body>
</html>