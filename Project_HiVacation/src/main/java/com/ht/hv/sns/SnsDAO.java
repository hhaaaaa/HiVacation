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

	public void write(SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		Member mb = (Member) request.getSession().getAttribute("loginMember");
		try {

			String path = request.getSession().getServletContext().getRealPath("resources/img");
			MultipartRequest mr = new MultipartRequest(request, path, 30 * 1024 * 1024, "utf-8",
					new DefaultFileRenamePolicy());

			sm.setHs_id(mb.getHm_id());
			sm.setHs_title(mr.getParameter("hs_title"));
			sm.setHs_text(mr.getParameter("hs_text"));

			int fileIndex = Integer.parseInt(mr.getParameter("fileI"));

			if (smp.write(sm) == 1) {
				request.setAttribute("r", "글쓰기 완료");
				allMsgCount++;
				int hs_no = smp.getSNStoNO(); // select문으로 hs_no가져옴
				BigDecimal Bhs_no = new BigDecimal(hs_no); // bigDecimal로변경
				List<Image> is = new ArrayList<Image>();// 해당 sns에 들어가는 파일들의
														// list
				int imgI = 0; // 이미지 인풋폼 갯수
				int imgC = 0;// 실제 추가된 이미지 갯수
				if (fileIndex != 0) { // 인풋폼이 하나라도 있을때
					for (int i = 0; i < fileIndex; i++) { // 인풋폼 갯수만큼
						String img = mr.getFilesystemName("file" + imgI);
						imgI = imgI + 1;
						if (img != null) { // 인풋폼에 이미지가 있을때
							img = URLEncoder.encode(img, "utf-8");
							img = img.replace("+", " ");
							is.add(new Image(null, Bhs_no, img));
							if (smp.imageWrite(is.get(imgC)) == 1) {
								imgC = imgC + 1;
								request.setAttribute("r", (imgC) + "개 이미지 포함글쓰기 완료");
							}
						}
					}
				} else {// sns글에 이미지가 아예없을때
					is.add(new Image(null, Bhs_no, "no_img"));
					sm.setHv_image(is);
				}
				if (imgC == 0) { // 인풋 폼은 있는데 이미지추가가 0개
					is.add(new Image(null, Bhs_no, "no_img"));
					sm.setHv_image(is);
				}
			}
		} catch (Exception e) {
			request.setAttribute("r", "글쓰기 실패");
			e.printStackTrace();
		}
	}

	public void getAllMsgCount() {
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		allMsgCount = smp.getAllSNSMsgCount();
	}

	public void getMyMsgCount(Member m, HttpServletRequest request, HttpServletResponse response) {
		m = (Member) request.getSession().getAttribute("loginMember");
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		allMyCount = smp.getMySNSMsgCount(m);
	}

	@SuppressWarnings("unchecked")
	public void paging(int pageNo, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);

		List<SNSMsg> snsMsgs = new ArrayList<SNSMsg>();
		List<SNSMsg> searchMsgs = (List<SNSMsg>) request.getSession().getAttribute("searchMsgs");

		double count = 3; // 한페이지에 보여지는 sns갯수
		request.setAttribute("count", count);
		request.setAttribute("curPage", pageNo);
		request.setAttribute("allMsgCount", allMsgCount);

		if (searchMsgs != null && searchMsgs.size() > 0) {
			int pageCount = (int) Math.ceil(searchMsgs.size() / count);
			request.setAttribute("pageCount", pageCount);

			int start = (searchMsgs.size() - ((pageNo - 1) * (int) count));
			int end = (int) ((pageNo == pageCount) ? 1 : (start - (count - 1)));
			System.out.println(start);
			System.out.println(end);
			ArrayList<SNSMsg> msgs = new ArrayList<SNSMsg>();
			SNSMsg smsg = null;

			for (int i = start - 1; i >= end - 1; i--) {
				smsg = searchMsgs.get(i);
				System.out.println("--");
				System.out.println(smsg.getHs_id());
				System.out.println("--");
				msgs.add(smsg);
			}
			request.setAttribute("msgs", msgs);
		} else if (searchMsgs != null && searchMsgs.size() == 0) {
			request.setAttribute("msgs", null);
			System.out.println("search널임");
		} else if (allMsgCount > 0) {
			int pageCount = (int) Math.ceil(allMsgCount / count);
			request.setAttribute("pageCount", pageCount);
			int start = (int) (allMsgCount - ((pageNo - 1) * count));
			int end = (int) ((pageNo == pageCount) ? 1 : (start - (count - 1)));

			SNSMsgNo smn = new SNSMsgNo(new BigDecimal(start), new BigDecimal(end));

			snsMsgs = smp.getSNSMsg(smn);

			request.setAttribute("msgs", snsMsgs);
		} else {
			request.setAttribute("pageCount", null);
		}
	}

	public void search(Search s, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		HttpSession hs = request.getSession();

		List<SNSMsg> searchMsgs = new ArrayList<SNSMsg>();
		String what = request.getParameter("what");
		String search = request.getParameter("search");
		s.setSearch(search);

		if (what.equals("hm_id")) {
			searchMsgs = smp.searchId(s);
		} else if (what.equals("hs_title")) {
			searchMsgs = smp.searchTitle(s);
		} else if (what.equals("hs_text")) {
			searchMsgs = smp.searchText(s);
		}
		hs.setAttribute("searchMsgs", searchMsgs);
	}

	public void clearSearch(HttpServletRequest request, HttpServletResponse response) {
		request.getSession().setAttribute("searchMsgs", null);
	}

	public void view(SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		SNSMsg selectSNS = new SNSMsg();
		List<Image> selectImg = new ArrayList<Image>();

		BigDecimal hs_no = new BigDecimal(request.getParameter("hs_no"));
		sm.setHs_no(hs_no);

		selectSNS = smp.snsView(sm);
		selectImg = smp.snsViewImg(sm);
		selectSNS.setHv_image(selectImg);

		request.setAttribute("selectSNS", selectSNS);
	}

	public void delete(SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);

		BigDecimal hs_no = new BigDecimal(request.getParameter("hs_no"));
		sm.setHs_no(hs_no);

		if (smp.snsDelete(sm) == 1) {
			request.setAttribute("r", "게시글 삭제");
			allMsgCount--;
		}
	}

	public void update(SNSMsg sm, HttpServletRequest request, HttpServletResponse response) {
		SnsMapper smp = ss.getMapper(SnsMapper.class);

		try {
			String path = request.getSession().getServletContext().getRealPath("resources/img");
			MultipartRequest mr = new MultipartRequest(request, path, 30 * 1024 * 1024, "utf-8",
					new DefaultFileRenamePolicy());

			BigDecimal hs_no = new BigDecimal(mr.getParameter("hs_no"));
			String hs_title = mr.getParameter("hs_title");
			String hs_text = mr.getParameter("hs_text");
			
			int updateFileIndex = Integer.parseInt(mr.getParameter("updateFileI"));
			
			sm.setHs_no(hs_no);
			sm.setHs_title(hs_title);
			sm.setHs_text(hs_text);

			if (smp.snsUpdate(sm) == 1) {
				request.setAttribute("r", "게시글 수정");

				List<Image> is = new ArrayList<Image>();// 해당 sns에 들어가는 파일들의
				// list
				int imgI = 0; // 이미지 인풋폼 갯수
				int imgC = 0;// 실제 추가된 이미지 갯수
				if (updateFileIndex != 0) { // 인풋폼이 하나라도 있을때
					for (int i = 0; i < updateFileIndex; i++) { // 인풋폼 갯수만큼
						String img = mr.getFilesystemName("updateFile" + imgI);
						imgI = imgI + 1;
						if (img != null) { // 인풋폼에 이미지가 있을때
							img = URLEncoder.encode(img, "utf-8");
							img = img.replace("+", " ");
							is.add(new Image(null, hs_no, img));
							if (smp.imageWrite(is.get(imgC)) == 1) {
								imgC = imgC + 1;
							}
						}
					}
				} else {// update할때 추가 이미지가 아예없을때
					is.add(new Image(null, hs_no, "no_img"));
					sm.setHv_image(is);
				}
				if (imgC == 0) { // update시 인풋 폼은 있는데 이미지추가가 0개
					is.add(new Image(null, hs_no, "no_img"));
					sm.setHv_image(is);
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String imgDelete(Image i, HttpServletRequest request, HttpServletResponse response){
		SnsMapper smp = ss.getMapper(SnsMapper.class);
		
		BigDecimal hi_no = new BigDecimal(request.getParameter("hi_no"));
		i.setHi_no(hi_no);
		
		if(smp.snsImgDelete(i)==1){
			return "1";
		}else{
			return "0";
		}
	}
	
	public void memberDeleteWhithSNS(Member m, HttpServletRequest request, HttpServletResponse response) {
		getMyMsgCount(m, request, response);
		allMsgCount = allMsgCount - allMyCount;
	}
}
