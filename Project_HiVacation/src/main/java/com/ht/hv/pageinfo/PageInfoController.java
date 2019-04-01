package com.ht.hv.pageinfo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;

@Controller
public class PageInfoController { 

	@Autowired
	private MemberDAO mDAO;
	
	@RequestMapping(value = "/go.pageInfo", method = RequestMethod.GET)
	public String goPageInfo(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "homepageInfo/aboutUs.jsp");
		return "index"; 
	}
	
}
