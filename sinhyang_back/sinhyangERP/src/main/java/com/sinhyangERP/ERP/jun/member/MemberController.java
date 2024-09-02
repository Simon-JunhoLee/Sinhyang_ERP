package com.sinhyangERP.ERP.jun.member;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.sinhyangERP.ERP.common.QueryVO;

@RestController
@RequestMapping("/erp/member")
public class MemberController {
	@Autowired
	MemberDAO dao;
	
	@Autowired
	MemberService service;
	
	@Autowired
	PasswordEncoder encoder;
	
	@InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
	
	@GetMapping("")
	public HashMap<String, Object> list(QueryVO query, MemberVO vo) {
		HashMap<String, Object> map = new HashMap<>();
		map.put("list", dao.list(query, vo));
		map.put("total", dao.total(query, vo));
		return map;
	}
	
	@PostMapping("")
	public void insert(@RequestBody MemberVO vo) {
		String member_info_pass =encoder.encode(vo.getMember_info_pass());
		vo.setMember_info_pass(member_info_pass);
		service.insert(vo);
	}
	
	@GetMapping("/memberKey")
	public String memberKey() {
		return dao.getERPMemberKey();
	}
	
	@GetMapping("/{member_info_id}")
	public MemberVO read(@PathVariable("member_info_id") String member_info_id) {
		return dao.read(member_info_id);
	}
	
	@PostMapping("/login")
	public int login(@RequestBody MemberVO vo) {
		int result = 0;
		MemberVO member = dao.read(vo.getMember_info_id());
		if(member != null) {
			if(encoder.matches(vo.getMember_info_pass(), member.getMember_info_pass())) {
				result = 1;
			}else {
				result = 2;
			}
		}
		return result;
	}
	
	@PutMapping("")
	public void updateInfo(@RequestBody MemberVO vo) {
		String member_info_pass =encoder.encode(vo.getMember_info_pass());
		vo.setMember_info_pass(member_info_pass);
		dao.updateInfo(vo);
	}
	
	@PutMapping("/login")
	public void updateLogin(@RequestBody MemberVO vo) {
		String member_info_pass =encoder.encode(vo.getMember_info_pass());
		vo.setMember_info_pass(member_info_pass);
		dao.updateLogin(vo);
	}
	
	@PostMapping("/update/photo/{member_info_key}")
	public void updatePhoto(@PathVariable("member_info_key") String member_info_key, MultipartHttpServletRequest multi) {
		try {
			String relativePath = "public/images/member/";
			String currentDir = System.getProperty("user.dir");
			String uploadPath = currentDir + File.separator + relativePath;

			File folder = new File(uploadPath);
			if (!folder.exists()) {
				folder.mkdirs(); // 폴더가 없으면 모든 부모 디렉토리까지 생성
			}
			MultipartFile file = multi.getFile("byte");
			if (file != null && !file.isEmpty()) {
				String fileName = member_info_key + ".jpg";
				File destFile = new File(uploadPath, fileName);
				file.transferTo(destFile);
				System.out.println("Uploaded file: " + fileName);
				File oldFile = new File(destFile + fileName);
				if(oldFile.exists()) {
					oldFile.delete();
				}
				// 이미지 경로 설정 및 DB 삽입
				MemberVO vo = new MemberVO();
				vo.setMember_info_key(member_info_key);
				vo.setMember_info_photo("/display?file=" + relativePath + fileName);
				dao.updatePhoto(vo);
			} else {
				System.out.println("No file uploaded or file is empty");
			}
		} catch (Exception e) {
			System.out.println("Attach 파일 업로드 오류: " + e.toString());
		}
	}
	
	@PutMapping("/erp")
	public void updateDept(@RequestBody MemberVO vo) {
		dao.updateERP(vo);
	}
	
	@DeleteMapping("")
	public void delete(@RequestBody Map<String, String> request) {
		String member_info_key = request.get("member_info_key");
		dao.delete(member_info_key);
	}
}
