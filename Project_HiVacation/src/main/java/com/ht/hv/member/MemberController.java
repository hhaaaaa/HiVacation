package com.ht.hv.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class MemberController {
	
	@RequestMapping(value = "/go.login", method = RequestMethod.GET)
	public String goLogin(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("contentPage", "member/login.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/go.join", method = RequestMethod.GET)
	public String goJoin(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("contentPage", "member/join.jsp");
		return "index"; 
	}
}