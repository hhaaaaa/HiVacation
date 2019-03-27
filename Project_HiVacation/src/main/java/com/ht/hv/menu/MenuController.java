package com.ht.hv.menu;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;
import com.ht.hv.plan.Plan;
import com.ht.hv.plan.Plans;


@Controller
public class MenuController {
	
	@Autowired private MemberDAO mDAO;
	@Autowired private MenuDAO menuDAO;
	
	@RequestMapping(value = "/go.calendar", method = RequestMethod.GET)
	public String goCalendar(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "menu/calendar.jsp");
		response.setHeader("Access-Control-Allow-Origin","*");
		return "index";
	}
	
	@RequestMapping(value = "/go.mypage", method = RequestMethod.GET)
	public String goMypage(Member m, Plan p, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		menuDAO.select(p, request);
		request.setAttribute("contentPage", "menu/mypage.jsp");
		return "index";
	}
	
	@RequestMapping(value = "/get.myPlan", method = RequestMethod.GET, 
			produces = "application/json; charset=utf-8")
	public @ResponseBody Plans getMyPlan(Plan p, HttpServletRequest request) {
		return menuDAO.selectJSON(p, request);
	}
	
}
