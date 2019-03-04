<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="snsTotalDiv">
		<div id="snsWriteGoDiv" onclick="goSnsWrite();">글쓰기</div>
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
		
		<!-- 페이징 소스 써야할 곳 -->
		
		<form action="search.go">
			<table>
				<tr>
					<td>
						<select name="sOption" id="searchSnsSelect">
							<option value="hm_id">ID</option>
							<option value="hs_title">제목</option>
							<option value="hs_text">내용</option>
						</select>
					</td>
					<td>
						<input name="sInput" id="searchSnsInput" autocomplete="off">
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