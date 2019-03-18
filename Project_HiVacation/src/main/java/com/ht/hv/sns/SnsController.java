package com.ht.hv.sns;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;

@Controller
public class SnsController {
	
	@Autowired
	private MemberDAO mDAO;
	
	@Autowired
	private SnsDAO sDAO;
	
	@RequestMapping(value = "/go.sns", method = RequestMethod.GET)
	public String goSns(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.clearSearch(request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/go.sns.write", method = RequestMethod.GET)
	public String goSnsWrite(Member m, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		request.setAttribute("contentPage", "sns/snsWrite.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/do.sns.write", method = RequestMethod.POST)
	public String doSnsWrite(Member m, SNSMsg s, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.write(s, request, response);
		sDAO.clearSearch(request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/page.go", method = RequestMethod.GET)
	public String pageGo(Member m, HttpServletRequest request, HttpServletResponse response) {
		int p = Integer.parseInt(request.getParameter("p"));
		mDAO.loginCheck(m, request, response);
		sDAO.paging(p, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
	
	@RequestMapping(value = "/go.search", method = RequestMethod.GET)
	public String goSearch(Member m, Search s, HttpServletRequest request, HttpServletResponse response) {
		mDAO.loginCheck(m, request, response);
		sDAO.search(s, request, response);
		sDAO.paging(1, request, response);
		request.setAttribute("contentPage", "sns/sns.jsp");       
		return "index"; 
	}
}
