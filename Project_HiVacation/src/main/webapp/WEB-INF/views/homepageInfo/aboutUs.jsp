<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div style="margin-top: 20px; width: 100%; position: absolute; left: 0px;">
		<table style="width: 100%;">
			<tr>
				<td style="width: 25%;"></td>
				<td style="width: 25%;" align="center"><img id="tionImg" src="resources/img/howToUse.png"></td>
				<td style="width: 25%;" align="center"><img id="hiImg" src="resources/img/madeBy.png"></td>
				<td style="width: 25%;"></td>
			</tr>
			<tr>
				<td style="width: 25%;"></td>
				<td style="width: 25%;" id="howToUse" align="center">이용방법</td>
				<td style="width: 25%;" id="madeBy" align="center">만든이</td>
				<td style="width: 25%;"></td>
			</tr>
		</table>
		
		<p><br>
		
		<div id="howToUseTotal">
			<div id="howToUseStep1">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;1. 홈 화면<br></td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain1.PNG" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px; width: 260px;">
							① Search 탭 클릭<br>
							② 지역 란에 원하는 지역 입력<br>&nbsp;&nbsp;&nbsp;&nbsp;(예: 종로, 가평, 파리 등)<br>
							③ 카테고리 란에 장소명 혹은 키워드 입력<br>&nbsp;&nbsp;&nbsp;&nbsp;(예: 솔데스크, 맛집, 숙박 등)<br>
							④ 카테고리 란 입력 후,<br>&nbsp;&nbsp;&nbsp;&nbsp;Enter키 혹은 돋보기 그림 클릭해서 검색
						</td>
					</tr>
					<tr>
						<td align="right" class="howToUseNextTd" colspan="2"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep2">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;2. 여행 검색</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain2.PNG" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px; width: 260px;">
							① 검색결과의 지역명을 클릭하면,<br>&nbsp;&nbsp;&nbsp;&nbsp;해당 장소 마커가 지도 중앙으로 이동<br>
							② 마커에 커서 올리면, 장소명이 표시<br>&nbsp;&nbsp;&nbsp;&nbsp;마커를 클릭하면, 상세 정보창 띄워줌
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd"><span class="howToUseBeforeButton">이전</span></td>
						<td align="right"  class="howToUseNextTd"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep3">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;3. 찜 하기</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain3.PNG" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px;">
							① 상세 정보창에서 빈 하트를 클릭하면,<br>&nbsp;&nbsp;&nbsp;&nbsp;꽉 찬 하트가 되며 찜 목록에 등록됨
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd"><span class="howToUseBeforeButton">이전</span></td>
						<td align="right" class="howToUseNextTd"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep4">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;4. 찜 목록 확인 &amp; 하자영역 등록</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain4.png" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px;">
							① Choice 탭 클릭해 찜 목록 확인<br>
							② 각 찜 영역의 목록 클릭하면,<br>&nbsp;&nbsp;&nbsp;&nbsp;해당 장소 마커가 지도 중앙으로 이동<br>
							③ 마커에 커서 올리면, 장소명이 표시<br>&nbsp;&nbsp;&nbsp;&nbsp;마커를 클릭하면, 상세 정보창 띄워줌<br>
							④ +버튼으로 하자 영역에 순서대로 추가,<br>&nbsp;&nbsp;&nbsp;&nbsp;x버튼으로 찜 목록에서 삭제<br>
							⑤ 찜 목록 초기화 가능
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd"><span class="howToUseBeforeButton">이전</span></td>
						<td align="right" class="howToUseNextTd"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep5">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;5. 여행 저장</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain5.png" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px;">
							① x버튼으로 하자 영역에서 삭제 가능&nbsp;&nbsp;&nbsp;<br>
							② 찜 영역에서 추가한 순서대로,<br>&nbsp;&nbsp;&nbsp;&nbsp;날짜 선택해서 여행 일정 저장
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd"><span class="howToUseBeforeButton">이전</span></td>
						<td align="right" class="howToUseNextTd"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep6">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;6. MY PAGE</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain6.PNG" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px;">
							① 여행 목록 클릭하면,<br>&nbsp;&nbsp;&nbsp;&nbsp;해당 여행 일정이 순서대로 출력<br>&nbsp;&nbsp;&nbsp;&nbsp;지도에 마커 출력<br>&nbsp;&nbsp;&nbsp;&nbsp;(마커에 여행 순서대로 숫자 표시)<br>
							② 마커에 커서 올리면, 장소명이 표시<br>&nbsp;&nbsp;&nbsp;&nbsp;마커 클릭하면, 상세 정보창 띄워줌&nbsp;&nbsp;&nbsp;<br>
							③ x버튼 누르면, 해당 여행 삭제
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd"><span class="howToUseBeforeButton">이전</span></td>
						<td align="right" class="howToUseNextTd"><span class="howToUseNextButton">다음</span></td>
					</tr>
				</table>
			</div>
			<div id="howToUseStep7">
				<table>
					<tr><td align="center" colspan="2" style="padding-bottom: 10px;">&nbsp;&nbsp;7. 캘린더</td></tr>
					<tr>
						<td align="center" style="width: 510px;"><img src="resources/img/explain7.png" style="width: 500px;"></td>
						<td style="font-size: 10pt; font-weight: normal; padding-left: 10px;">
							① 여행 일정에 마우스 커서 올려놓으면,<br>&nbsp;&nbsp;&nbsp;&nbsp;해당 여행 일정 순서대로 출력
						</td>
					</tr>
					<tr>
						<td align="left" class="howToUseBeforeTd" colspan="2"><span class="howToUseBeforeButton">이전</span></td>
					</tr>
				</table>
			</div>
		</div>
		
		<p><br>
		
		<div id="madeByTotal">
			<table style="width: 100%; border-spacing: 0px;">
				<tr>
					<td style="width: 25%;"></td>
					<td align="center" style="width: 25%;"><img src="resources/img/tion.png" style="width: 100px;"></td>
					<td align="center" style="width: 25%;"><img src="resources/img/hi.png" style="width: 100px;"></td>
					<td style="width: 25%;"></td>
				</tr>
				<tr>
					<td style="width: 25%;"></td>
					<td align="center" style="width: 25%; padding-bottom: 10px;">조&nbsp;수&nbsp;연</td>
					<td align="center" style="width: 25%; padding-bottom: 10px;">하&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;현</td>
					<td style="width: 25%;"></td>
				</tr>
				<tr>
					<td style="width: 25%;"></td>
					<td align="center" style="width: 25%;"></td>
					<td align="center" style="width: 25%;"></td>
					<td style="width: 25%;"></td>
				</tr>
			</table>
		</div>
		
	</div>
</body>
</html>