package com.ht.hv.plan;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlanDAO {
	
	@Autowired
	private SqlSession ss;
	
	// 비동기식으로 DB에 하자영역 데이터 저장
	public String saveSchedule(Plan p, HttpServletRequest request) {
		try {
			if (ss.getMapper(PlanMapper.class).saveSchedule(p) == 1) {
				return "여행 저장 완료됐습니다.";
			}

			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return "여행 저장에 실패했습니다.";
		}
	}
	
	// 오늘 날짜 가져오기
	public void getTodayDate(HttpServletRequest request) {
		try {
			Date today = new Date();
			request.setAttribute("today", today);
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
			String year = sdf.format(today);
			request.setAttribute("year", year);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	// proxy서버를 통해 detail 정보들 ajax요청하기 위해
	public String getSearchedDetail(HttpServletRequest request) {
		try {
			String placeId = request.getParameter("placeid");
			String key = request.getParameter("key");
			
			URL u = new URL("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId + "&key=" + key);
			HttpsURLConnection huc = (HttpsURLConnection) u.openConnection();
			InputStream is = huc.getInputStream();
			
			InputStreamReader isr = new InputStreamReader(is, "utf-8");
			BufferedReader br = new BufferedReader(isr);
			StringBuffer sb = new StringBuffer();
			String line = null;
			while ((line = br.readLine()) != null) {
				sb.append(line);
			}
			String json = sb.toString();
			return json;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
