package com.ht.hv.plan;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
public class PlanController {
	
	@Autowired
	private PlanDAO pDAO; 
	
	@RequestMapping(value = "/get.detail.search", method = RequestMethod.GET, 
			produces = "application/json; charset=utf-8")
	public @ResponseBody String getSearchedDetail(HttpServletRequest request) {
		return pDAO.getSearchedDetail(request);
	}
	
	@RequestMapping(value = "/go.save.schedule", method = RequestMethod.GET, 
			produces = "application/json; charset=utf-8")
	public @ResponseBody String goSaveSchedule(Plan p, HttpServletRequest request) {
		return pDAO.saveSchedule(p, request);
	}
	
	
}
