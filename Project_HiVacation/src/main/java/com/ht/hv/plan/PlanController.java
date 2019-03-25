package com.ht.hv.map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MapController {
	
	@Autowired
	private MapDAO mDAO;

	@RequestMapping(value = "/get.detail.search", method = RequestMethod.GET, 
			produces = "application/json; charset=utf-8")
	public @ResponseBody String getSearchedDetail(HttpServletRequest request) {
		return mDAO.getSearchedDetail(request);
	}
}
