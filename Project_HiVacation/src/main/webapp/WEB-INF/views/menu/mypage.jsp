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
	<table id="totalMyPageTable">
		<tr>
			<td align="center" style="width: 100%;">
				<table style="width: 100%;">
					<tr>
						<td valign="top" align="center" style="width: 23%;">
							<div id="myPlanDiv">
								${sessionScope.loginMember.hm_name } <span style="font-weight: normal; font-size: 10pt;">님의 여행</span><p>
								<!-- 여행 표시 -->
							</div>
							<script type="text/javascript">
								getMyPlan();
							</script>
						</td>
						<td style="width: 77%;">
							<div id="myPageMap">
							<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAnIve1J3a9dk9LpwOvpXbKDW0fCSk_8wM&callback=initMap3"></script>
								<!-- 지도 표시 -->
							</div>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>