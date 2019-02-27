package com.ht.hv.member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MemberController {
	@Autowired private MemberDAO mDAO;
	
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
	
	@RequestMapping(value = "/do.join", method = RequestMethod.GET)
	public String doJoin(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.join(m, request, response);
		request.setAttribute("contentPage", "member/join.jsp");
		return "index"; 
	}

	@RequestMapping(value = "/member.id.check", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Members IdCheck(Member m) {
		return mDAO.idCheck(m); 
	}
}
