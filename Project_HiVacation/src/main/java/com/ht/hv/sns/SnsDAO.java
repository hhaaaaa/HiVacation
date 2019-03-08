package com.ht.hv.sns;

import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ht.hv.member.Member;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;

@Service
public class SnsDAO {

	private int allMsgCount;
	private int allMyCount;
	@Autowired 
	private SqlSession ss;	 
	
	public void write(SNSMsg smsg, HttpServletRequest request, HttpServletResponse response){
		SnsMapper sm = ss.getMapper(SnsMapper.class);
		Member mb = (Member) request.getSession().getAttribute("loginMember");
		try {
			String path = request.getSession().getServletContext().getRealPath("resources/img");
			MultipartRequest mr = new MultipartRequest(request, path, 30 * 1024 * 1024, "utf-8",
					new DefaultFileRenamePolicy());
			
			smsg.setHs_id(mb.getHm_id());
			smsg.setHs_title(mr.getParameter("hs_title"));
			smsg.setHs_text(mr.getParameter("hs_text"));
			
			String hs_img = mr.getFilesystemName("hs_img");
			hs_img = URLEncoder.encode(hs_img, "utf-8");
			hs_img = hs_img.replace("+", " ");
			smsg.setHs_img(mr.getFilesystemName("hs_img"));
			
			if(sm.write(smsg)==1){
				request.setAttribute("r","글쓰기 완료");
				allMsgCount++;
			}
			
		} catch (Exception e) {
			request.setAttribute("r","글쓰기 실패");
			e.printStackTrace();
		}
	}

	public void getAllMsgCount(){
		SnsMapper sm = ss.getMapper(SnsMapper.class);
		allMsgCount = sm.getAllSNSMsgCount();
	}
	
	public void getMyMsgCount(Member m, HttpServletRequest request, HttpServletResponse response){
		m = (Member) request.getSession().getAttribute("loginMember");
		SnsMapper sm = ss.getMapper(SnsMapper.class);
		allMyCount = sm.getMySNSMsgCount(m);
	}
	
	@SuppressWarnings("unchecked")
	public void paging(int pageNo, HttpServletRequest request, HttpServletResponse response){
		SnsMapper sm = ss.getMapper(SnsMapper.class);

		List<SNSMsg> snsMsgs = new ArrayList<SNSMsg>();
		List<SNSMsg> searchMsgs = (List<SNSMsg>) request.getSession().getAttribute("searchMsgs");
		
		
		double count = 3; //한페이지에 보여지는 sns갯수
		request.setAttribute("curPage", pageNo);
		request.setAttribute("allMsgCount", allMsgCount);
		
		if(searchMsgs != null && searchMsgs.size() > 0){
			int pageCount = (int) Math.ceil(searchMsgs.size() / count);
			request.setAttribute("pageCount", pageCount);
			
			int start = (searchMsgs.size() - ((pageNo - 1) * (int) count));
			int end = (int) ((pageNo == pageCount) ? 1 : (start - (count - 1)));
			ArrayList<SNSMsg> msgs = new ArrayList<SNSMsg>();
			SNSMsg smsg = null;
			
			for (int i = start-1; i >= end-1; i--) {
				smsg = searchMsgs.get(i);
				msgs.add(smsg);
			}
			request.setAttribute("msgs", msgs);
		}else if(searchMsgs != null && searchMsgs.size()==0){
			request.setAttribute("msgs", null);
			System.out.println("search널임");
		}		
		else if(allMsgCount > 0){
			int pageCount = (int) Math.ceil(allMsgCount / count);
			request.setAttribute("pageCount", pageCount);
			int start = (int) (allMsgCount - ((pageNo - 1) * count));
			int end = (int) ((pageNo == pageCount) ? 1 : (start -( count - 1)));
			
			SNSMsgNo smn = new SNSMsgNo(new BigDecimal(start), new BigDecimal(end));
			
			snsMsgs = sm.getSNSMsg(smn);
			
			request.setAttribute("msgs", snsMsgs);
		}else{
			request.setAttribute("pageCount", null);
		}
	}

	public void search(Search s, HttpServletRequest request, HttpServletResponse response){
		SnsMapper sm = ss.getMapper(SnsMapper.class);
		HttpSession hs = request.getSession();
		
		List<SNSMsg> searchMsgs = new ArrayList<SNSMsg>();
		String what = request.getParameter("what");
		String search = request.getParameter("search");
		s.setSearch(search);
		
		if(what.equals("hm_id")){
			searchMsgs = sm.searchId(s);
		}else if(what.equals("hs_title")){
			searchMsgs = sm.searchTitle(s);
		}else if(what.equals("hs_text")){
			searchMsgs = sm.searchText(s);
		}
		hs.setAttribute("searchMsgs", searchMsgs);
	}
	
	public void clearSearch(HttpServletRequest request, HttpServletResponse response){
		request.getSession().setAttribute("searchMsgs", null);
	}
}
