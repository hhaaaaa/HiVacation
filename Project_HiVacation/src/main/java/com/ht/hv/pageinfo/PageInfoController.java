package com.ht.hv.pageinfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PageInfoController {

	@RequestMapping(value = "/go.pageInfo", method = RequestMethod.GET)
	public String goPageInfo(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("contentPage", "homepageInfo/aboutUs.jsp");
		return "index"; 
	}
	
}
