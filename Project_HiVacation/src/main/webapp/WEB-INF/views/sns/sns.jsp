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
			<div id="snsWriteGoDiv" onclick="goSnsWrite();">글쓰기</div>
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
					아이디
				</td>
				<td align="center" id="snsDateMenu">
					날짜
				</td>
			</tr>
		</table>
		<table id="snsContentTable"></table><p>
		
		<table id="snsContentTable">
			<c:forEach items="${msgs }" var="m">
				<tr>
					<td align="center" id="snsContentNo">
					 번호난중에
					</td>
					<td id="snsContentTitle">
						&nbsp;&nbsp;${m.hs_title }
					</td>
					<td align="center" id="snsContentId">
						${m.hs_id }
					</td>
					<td align="center" id="snsContentDate">
						<fmt:formatDate value="${m.hs_date }" pattern="yyyy-MM-dd"/>
						<br>
						<fmt:formatDate value="${m.hs_date }" pattern="a hh:mm"/>
					</td>
				</tr>
			</c:forEach>
		</table><p>
		
		<table id="pageCountTalbe">
		<tr>
			<c:forEach var="i" begin="1" end="${pageCount }">
				<td>&nbsp;<a href="page.go?p=${i }">${i }</a>
				</td>
			</c:forEach>
		</tr>
		</table>
		
		<form action="search.go">
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