package com.ht.hv.sns;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SnsController {
	
	@RequestMapping(value = "/go.sns", method = RequestMethod.GET)
	public String goSns(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("contentPage", "sns/sns.jsp");
		return "index"; 
	}
}
