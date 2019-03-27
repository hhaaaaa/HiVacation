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
			<input id="step1SearchCity" placeholder="지역" autocomplete="off" autofocus="autofocus">
			<input id="step1SearchCategory" placeholder="카테고리" autocomplete="off">
			<img id="step1SearchImg" src="resources/img/search_black.png"><p>
			<div id="step1ResultDiv">
					<!-- 검색 결과 출력할 div -->
			<p></div>
		</div>
		
		<div id="step2Div" class="cannotSeeFirstDiv">
			Step2. 찜 목록 &amp; 일정 저장<br>
			<span id="step2InitializeAreaSpan">
				<img src="resources/img/refresh_icon.png" style="position: relative; top: 4px;">
				찜목록 초기화
			</span>
			<div id="step2Map">지도</div><p>
			<table id="step2SaveScheduleTable">
				<tr>
					<td class="step2MenuTd">
						<img src="resources/img/green_marker.png" style="position: relative; top: 2px;">가자
					</td>
					<td id="step2EmptyTd" rowspan="8"></td>
					<td class="step2MenuTd">
						&nbsp;<img src="resources/img/save_icon.png" style="position: relative; top: 2px;"> 하자
						<span style="position: relative; left: 1px; z-index: 90; background-color: white;">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						</span>
					</td>
				</tr>
				<tr>
					<td id="step2GoArea" valign="top">
						<div id="step2GoAreaDiv"><!-- 가자영역 --></div>
					</td>
					<td rowspan="7" id="step2DoArea">
						<table style="width: 100%;">
							<tr>
								<td id="step2DoList" valign="top" align="center">
									<div id="step2DoListDiv"><!-- 하자영역 --></div>
								</td>
							</tr>
							<tr>
								<td id="step2DoSaveMenu" align="center">
									<select name="saveYear" id="step2SaveYear" class="step2SaveDate">
										<option value="" selected disabled style="display: none;">년</option>
										<option value="${year }">${year }</option>
										<option value="${year+1 }">${year+1 }</option>
										<option value="${year+2 }">${year+2 }</option>
									</select>
									<select name="saveMonth" id="step2SaveMonth" class="step2SaveDate">
										<option value="" selected disabled style="display: none;">월</option>
										<c:forEach begin="1" end="12" var="i">
											<option value="${i }">${i }</option>
										</c:forEach>
									</select>
									<select name="saveDay" id="step2SaveDay" class="step2SaveDate">
										<option value="" selected disabled style="display: none;">일</option>
										<c:forEach begin="1" end="31" var="j">
											<option value="${j }">${j }</option>
										</c:forEach>
									</select>
									<button id="step2SaveButton" onclick="saveDoListInDB('${sessionScope.loginMember.hm_id }');">저장</button>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr><td></td></tr>
				<tr>
					<td class="step2MenuTd">
						<img src="resources/img/blue_marker.png" style="position: relative; top: 2px;">먹자
					</td>
				</tr>
				<tr>
					<td id="step2EatArea" valign="top">
						<div id="step2EatAreaDiv"><!-- 먹자영역 --></div>
					</td>
				</tr>
				<tr><td></td></tr>
				<tr>
					<td class="step2MenuTd">
						<img src="resources/img/red_marker.png" style="position: relative; top: 2px;">자자
					</td>
				</tr>
				<tr>
					<td id="step2SleepArea" valign="top">
						<div id="step2SleepAreaDiv"><!-- 자자영역 --></div>
					</td>
				</tr>
			</table><p>
		</div>
		
		<div id="step3Div" class="cannotSeeFirstDiv">
			Step3. 예산 짜기<p>
			<table id="budgetTable">
				<tr>
					<td id="budgetTableTD1">
						<table id="tour">
							<tr>
								<td align="center" id="tourTD1">
									관광비
								</td>
							</tr>
							<tr>
								<td id="tourTD2">
									<textarea id="tourTextarea" placeholder="엔터로 구분"></textarea>
								</td>
							</tr>
							<tr>
								<td align="right" id="tourTD3">
									<!-- 관광비총합 -->
								</td>
							</tr>
						</table>
					</td>
					<td id="budgetTableTD2">
						<table id="food">
							<tr>
								<td align="center" id="foodTD1">
									식비
								</td>
							</tr>
							<tr>
								<td id="foodTD2">
									<textarea id="foodTextarea" placeholder="엔터로 구분"></textarea>
								</td>
							</tr>
							<tr>
								<td align="right" id="foodTD3">  
									<!-- 식비총합 -->
								</td>
							</tr>
						</table>
					</td>
					<td id="budgetTableTD3">
						<table id="sleep">
							<tr>
								<td align="center" id="sleepTD1">
									숙박비
								</td>
							</tr>
							<tr>
								<td id="sleepTD2">
									<textarea id="sleepTextarea" placeholder="엔터로 구분"></textarea>
								</td>
							</tr>
							<tr>
								<td align="right" id="sleepTD3">
									<!-- 숙박비총합 -->
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td colspan="3" align="right" >
						<span id="totalCost"></span> / <input id="numPeople" placeholder="인원"><button id="calculate">계산</button>
					</td> 
				</tr>
				<tr>
					<td colspan="3" align="right">
						->인당  <span id="perPerson"></span>원
					</td>
				</tr>
			</table>
		</div>
	</div>
</body>
</html>