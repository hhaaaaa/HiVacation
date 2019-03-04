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
	public String goLogin(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "member/login.jsp");
		return "index"; 
	}
	@RequestMapping(value = "/do.login", method = RequestMethod.POST)
	public String doLogin(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.login(m, request, response);
		if (mDAO.loginCheck(m, request, response)) {
			request.setAttribute("contentPage", "scheduling/scheduling.jsp");
		} else {
			request.setAttribute("contentPage", "member/login.jsp");
		}
		return "index";
	}
	
	@RequestMapping(value = "/go.join", method = RequestMethod.GET)
	public String goJoin(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "member/join.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/do.join", method = RequestMethod.POST)
	public String doJoin(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		mDAO.join(m, request, response);
		request.setAttribute("contentPage", "scheduling/scheduling.jsp");
		return "index"; 
	}

	@RequestMapping(value = "/member.id.check", method = RequestMethod.GET,produces="application/json; charset=utf-8")
	public @ResponseBody Members IdCheck(Member m) {
		return mDAO.idCheck(m); 
	}
	
	@RequestMapping(value = "/go.update", method = RequestMethod.GET)
	public String goUpdate(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		mDAO.divideAddr(request, response);
		request.setAttribute("contentPage", "member/update.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/do.update", method = RequestMethod.GET)
	public String doUpdate(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		mDAO.update(m, request, response);
		request.setAttribute("contentPage", "scheduling/scheduling.jsp");
		return "index"; 
	}
}
