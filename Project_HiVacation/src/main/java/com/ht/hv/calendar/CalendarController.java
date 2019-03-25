package com.ht.hv.calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;


@Controller
public class CalendarController {
@Autowired private MemberDAO mDAO;
	
	@RequestMapping(value = "/go.calendar", method = RequestMethod.GET)
	public String home(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "calendar/calendar.jsp");
		response.setHeader("Access-Control-Allow-Origin","*");
		return "index";
	}	
}
