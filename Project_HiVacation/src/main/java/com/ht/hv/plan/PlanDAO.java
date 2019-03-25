package com.ht.hv.map;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

@Service
public class MapDAO {

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
