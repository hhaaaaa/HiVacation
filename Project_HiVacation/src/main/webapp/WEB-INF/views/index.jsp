<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Hi Vacation</title>  
<link rel="stylesheet" href="resources/css/index.css">     
<link rel="stylesheet" href="resources/css/member/login.css">
<link rel="stylesheet" href="resources/css/member/beforeLogin.css">
<link rel="stylesheet" href="resources/css/member/afterLogin.css">
<link rel="stylesheet" href="resources/css/member/join.css">
<link rel="stylesheet" href="resources/css/member/update.css">
<link rel="stylesheet" href="resources/css/scheduling/scheduling.css">
<link rel="stylesheet" href="resources/css/sns/sns.css">
<link rel="stylesheet" href="resources/css/sns/snsWrite.css">
<script type="text/javascript" src="resources/js/jquery.js"></script>
<script type="text/javascript" src="resources/js/validCheckHha.js"></script>
<script type="text/javascript" src="resources/js/validCheck.js"></script>
<script type="text/javascript" src="resources/js/memberJquery.js"></script>
<script type="text/javascript" src="resources/js/mapJquery.js"></script>
<script type="text/javascript" src="resources/js/go.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCrYnDphc_WgUlfkKoTWY3KbrE-IufZjY&language=ko&region=KO"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCrYnDphc_WgUlfkKoTWY3KbrE-IufZjY&libraries=places"></script>
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<script type="text/javascript"> 
	$(function() {
		connectSummonAddInputEventJoin();
		connectSummonAddInputEventUpdate();
		connectIdCheckEvent();
		schedulingPaging();
		initMap();
		myMenuLocationControl();
		searchLocationByQuery();
		searchDetailByKeyword();
	});
</script>
</head>
<body>
	<table id="totalPageTable">
		<tr>
			<td align="center" style="background-color: white;">
				<span id="actionResultSpan">${r }</span>
				<span id="borderWhiteSpan"></span>
				<table id="MenuTable">
					<tr>
						<td align="center" id="goAboutUs" onclick="goPageInfo();">AboutUs</td>
						<td align="center" id="goSns" onclick="goSns();">게시판</td>
					</tr>
				</table>
				<div id="loginTable"><jsp:include page="${loginPage }"/></div>
				<table id="titleTable">
					<tr>
						<td align="center">
							<span id="title" onclick="goHome();">
								<img src="resources/img/title.png" id="titleImg">
							</span>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td>
				<table id="contentTable">
					<tr>
						<td align="center">
							<table id="content">
								<tr>
									<td align="center">
										<jsp:include page="${contentPage }"/>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>