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
			<input id="step1SearchCity" placeholder="지역" autocomplete="off" autofocus="autofocus">
			<input id="step1SearchCategory" placeholder="카테고리" autocomplete="off">
			<img id="step1SearchImg" src="resources/img/search_black.png"><p>
			<div id="step1ResultDiv">
					<!-- 검색 결과 출력할 div -->
			<p></div>
		</div>
		
		<div id="step2Div" class="cannotSeeFirstDiv">
			Step2. 찜 목록 &amp; 일정 저장<p>
			<div id="step2Map">지도</div><p>
			<table id="step2SaveScheduleTable">
				<tr>
					<td class="step2MenuTd">
						<img src="resources/img/green_marker.png" style="position: relative; top: 2px;">가자
					</td>
					<td id="step2EmptyTd" rowspan="8"></td>
					<td class="step2MenuTd">
						&nbsp;<img src="resources/img/save_icon.png" style="position: relative; top: 2px;"> 하자
					</td>
				</tr>
				<tr>
					<td id="step2GoArea" valign="top">
						<div id="step2GoAreaDiv"><!-- 가자영역 --></div>
					</td>
					<td rowspan="7" id="step2DoArea">
						<table style="width: 100%;">
							<tr>
								<td id="step2DoList"></td>
							</tr>
							<tr>
								<td id="step2DoSaveMenu" align="center">
									<select class="step2SaveDate">
										<option></option>
									</select>
									<select class="step2SaveDate">
										<option></option>
									</select>
									<select class="step2SaveDate">
										<option></option>
									</select>
									<button id="step2SaveButton">저장</button>
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
			<span class="saveButtonScheDiv">저장</span>
		</div>
	</div>
</body>
</html>