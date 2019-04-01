package com.ht.hv;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ht.hv.member.Member;
import com.ht.hv.member.MemberDAO;
import com.ht.hv.plan.PlanDAO;
import com.ht.hv.sns.SnsDAO;
@Controller
public class HomeController {
	@Autowired
	private MemberDAO mDAO;
	
	@Autowired
	private SnsDAO sDAO;
	
	@Autowired
	private PlanDAO pDAO;
	
	private boolean firstReq;//첫 요청 확인 변수
	public HomeController(){
		firstReq = true;
	}
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Member m, HttpServletRequest request, HttpServletResponse response) {
		if(firstReq){
			sDAO.getAllMsgCount();
			firstReq = false;
		}
		mDAO.loginCheck(m, request, response);
		pDAO.getTodayDate(request);
		request.setAttribute("contentPage", "scheduling/scheduling.jsp");
		return "index"; 
	}
	
	@RequestMapping(value = "/go.home", method = RequestMethod.GET)
	public String goHome(Member m, HttpServletRequest request, HttpServletResponse response) {
		return home(m, request, response);
	}
	
}
