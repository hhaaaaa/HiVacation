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
	<div id="snsTotalDiv">
		<c:if test="${sessionScope.loginMember !=null }" >
			<div id="snsWriteGoDiv" onclick="goSnsWrite();">글 쓰기</div>
		</c:if>
		<table id="snsMenuTable">       
			<tr>
				<td align="center" id="snsNoMenu">
					번호
				</td>
				<td align="center" id="snsTitleMenu">
					제목
				</td>
				<td align="center" id="snsIdMenu">
					ID
				</td>
				<td align="center" id="snsDateMenu">
					날짜
				</td>
			</tr>
		</table>
		<c:set var="no" value="${allMsgCount+1-((curPage-1)*count) }" />
		<table id="snsContentTable">
			<c:forEach items="${msgs }" var="m">
				<tr>
					<td align="center" class="snsContentNo" style="font-size: 10pt;">
					 	<c:set var="no" value="${no-1 }" />
					 	<fmt:formatNumber value="${no }" pattern="#"/>
					</td>
					<td class="snsContentTitle" onclick="goSnsView(${m.hs_no }, '${sessionScope.loginMember }');">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${m.hs_title }
					</td>
					<td align="center" class="snsContentId">
						${m.hs_id }
					</td>
					<td align="center" class="snsContentDate">
						<fmt:formatDate value="${m.hs_date }" pattern="yyyy-MM-dd"/>
						<br>
						<fmt:formatDate value="${m.hs_date }" pattern="a hh:mm"/>
					</td>
				</tr>
			</c:forEach>
		</table><p>
		
		<table id="pageCountTalbe">
			<tr>
				<c:choose>
					<%--현재페이지가 1 이고 마지막페이지가 현재페이지+2미만 --%>
					<c:when test="${curPage==1 && curPage+2>pageCount }">
						<c:forEach var="i" begin="1" end="${pageCount }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
					<%--현재페이지가 1 이고 마지막페이지가 현재페이지+2이상 --%>
					<c:when test="${curPage==1 && curPage+2<=pageCount }">
						<c:forEach var="i" begin="1" end="${curPage+2 }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
					<%--현재페이지가 2 이고 마지막페이지가 현재페이지+2미만 --%>
					<c:when test="${curPage==2 && curPage+2>pageCount }">
						<c:forEach var="i" begin="1" end="${pageCount }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
					<%--현재페이지가 2 이고 마지막페이지가 현재페이지+2이상 --%>
					<c:when test="${curPage==2 && curPage+2<=pageCount }">
						<c:forEach var="i" begin="1" end="${curPage+2 }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
					<%--현재페이지가 3이상 이고 마지막페이지가 현재페이지+2미만 --%>					
					<c:when test="${curPage>2 && curPage+2>pageCount }">
						<c:forEach var="i" begin="${curPage-2 }" end="${pageCount }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
					<%--현재페이지가 3이상 이고 마지막페이지가 현재페이지+2이상 --%>					
					<c:when test="${curPage>2 && curPage+2<=pageCount }">
						<c:forEach var="i" begin="${curPage-2 }" end="${curPage+2 }">
							<td>&nbsp;
								<c:if test="${i == curPage }">
									<a href="page.go?p=${i }" class="pageCountTableCurrentA">${i }</a>
								</c:if>
								<c:if test="${i != curPage }">
									<a href="page.go?p=${i }" class="pageCountTableA">${i }</a>
								</c:if>
							</td>
						</c:forEach>
					</c:when>
				</c:choose>
			</tr>
		</table>
		
		<form action="go.search">
			<table>
				<tr>
					<td>
						<select name="what" id="searchSnsSelect">
							<option value="hm_id">ID</option>
							<option value="hs_title">제목</option>
							<option value="hs_text">내용</option>
						</select>
					</td>
					<td>
						<input name="search" id="searchSnsInput" autocomplete="off">
					</td>
					<td>
						<button id="searchSnsButton">검색</button>
					</td>
				</tr>
			</table>
		</form>
	
		<p><br>
		
	</div>
</body>
</html>