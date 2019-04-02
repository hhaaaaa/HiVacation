package com.ht.hv.menu;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ht.hv.member.Member;
import com.ht.hv.plan.Plan;
import com.ht.hv.plan.PlanMapper;
import com.ht.hv.plan.Plans;

@Service 
public class MenuDAO {

	@Autowired 
	private SqlSession ss;
	
	public String deleteEachPlan(Plan p, HttpServletRequest request) {
		try {
			BigDecimal hp_no = p.getHp_no();
			
			if (ss.getMapper(PlanMapper.class).deleteEachPlan(p) == 1) {
				request.setAttribute("r", "여행 삭제 성공");
				return "{\"result\": \"" + hp_no + "\"}";
			}
			return null;
			
		} catch (Exception e) {
			e.printStackTrace();
			request.setAttribute("r", "여행 삭제 실패");
			return "{\"result\": \"실패.\"}";
		}
	}
	
	public void select(Plan p, HttpServletRequest request) {
		try {
			Member m = (Member) request.getSession().getAttribute("loginMember");
			p.setHp_uid(m.getHm_id());
			
			List<Plan> myPlans = ss.getMapper(PlanMapper.class).getMyPlan(p);
			request.setAttribute("myPlans", myPlans);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Plans selectJSON(Plan p, HttpServletRequest request) {
		try {
			Member m = (Member) request.getSession().getAttribute("loginMember");
			p.setHp_uid(m.getHm_id());
			
			List<Plan> myPlans = ss.getMapper(PlanMapper.class).getMyPlan(p);
			Plans ps = new Plans(myPlans);
			
			return ps;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
