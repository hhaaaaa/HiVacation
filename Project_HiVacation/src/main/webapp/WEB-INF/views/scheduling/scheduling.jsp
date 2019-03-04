<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<table id="schedulingMenuTable">
		<tr>
			<td align="center" class="schedulingMenuTd" id="step1Menu">Search</td>
			<td align="center" class="schedulingMenuTd" id="step2Menu">Choice</td>
			<td align="center" class="schedulingMenuTd" id="step3Menu">Budget</td>
			<td class="schedulingMenuTd"></td> 
			<td class="schedulingMenuTd"></td>
		</tr>
	</table>
	<div id="schedulingTotalDiv">
		<div id="step1Div">
			Step1. 여행 검색<p>
			<div id="step1Map"></div>
			<input id="step1SearchCity" placeholder="도시" autocomplete="off" autofocus="autofocus">
			<input id="step1SearchCategory" placeholder="카테고리" autocomplete="off">
			<img id="step1SearchImg" src="resources/img/search_black.png"><p>
			<table id="step1SearchResult"></table><p>
		</div>
		<div id="step2Div" class="cannotSeeFirstDiv">
			Step2. 찜 목록 &amp; 일정 저장<p>
			
		</div>
		<div id="step3Div" class="cannotSeeFirstDiv">
			Step3. 예산 짜기<p>
			<span class="saveButtonScheDiv">저장</span>
		</div>
	</div>
</body>
</html>