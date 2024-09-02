package com.sinhyangERP.ERP.starim.items;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
@RequestMapping("/erp/items")
public class ItemsController {

	@Autowired
	ItemsDAO dao;
	
	@GetMapping("/list.json")
	public List<ItemsVO> listPage(QueryVO vo) {
		return dao.listpage(vo);
	}
	
	@GetMapping
	public HashMap<String, Object> list(QueryVO vo){
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("total", dao.total(vo));
		map.put("documents", dao.list(vo));
		return map;
	}
	
	@PostMapping
	public String insert(@RequestBody ItemsVO vo) {
		dao.insert(vo);
		String items_id = vo.getItems_id();
		return items_id;
	}
	
	@DeleteMapping("/{items_id}")
	public void delete(@PathVariable("items_id") String items_id) {
		dao.delete(items_id);
	}
	
	@GetMapping("/{items_id}")
	public ItemsVO read(@PathVariable("items_id") String items_id) {
		return dao.read(items_id);
	}
	
	@PutMapping
	public void update(@RequestBody ItemsVO vo) {
		dao.update(vo);
	}
	
	@PostMapping("/update1")
	public void update1(ItemsVO vo,  MultipartHttpServletRequest multi)throws Exception{
		MultipartFile file= multi.getFile("byte");
		if(!file.isEmpty()) {
			System.out.println("file.........."+ file.getOriginalFilename());
			//파일업로드
			String filePath = "/sinhyang ERP/sinhyang-ERP-front/public/images/items/";
			String fileName = vo.getItems_id() + ".jpg";
			File oldFile = new File(filePath + fileName);
			if(oldFile.exists()) {
				oldFile.delete();
			}else {
				//이미지업로드한걸로 업데이트
				ItemsVO item = new ItemsVO();
				vo.setItems_id(item.getItems_id());
				vo.setItems_photo("/display?file=" + filePath + fileName);
				dao.updatePhoto(item);
			}
			file.transferTo(new File("c:" + filePath + fileName));
		}
		
		System.out.println(vo.toString());
		dao.update(vo);
	}
	
	@PostMapping("/update/image/{items_id}")
	public void updateImage(@PathVariable("items_id") String items_id, MultipartHttpServletRequest multi){
		try {
			String relativePath = "public/images/items/";
			String currentDir = System.getProperty("user.dir");
			String uploadPath = currentDir + File.separator + relativePath;

			File folder = new File(uploadPath);
			if (!folder.exists()) {
				folder.mkdirs(); // 폴더가 없으면 모든 부모 디렉토리까지 생성
			}
			MultipartFile file = multi.getFile("byte");
			if (file != null && !file.isEmpty()) {
				String fileName = items_id + ".jpg";
				File destFile = new File(uploadPath, fileName);
				file.transferTo(destFile);
				System.out.println("Uploaded file: " + fileName);
				File oldFile = new File(destFile + fileName);
				if(oldFile.exists()) {
					oldFile.delete();
				}
				// 이미지 경로 설정 및 DB 삽입
				ItemsVO vo = new ItemsVO();
				vo.setItems_id(items_id);
				vo.setItems_photo("/display?file=" + relativePath + fileName);
				dao.updatePhoto(vo);
			} else {
				System.out.println("No file uploaded or file is empty");
			}
		} catch (Exception e) {
			System.out.println("Attach 파일 업로드 오류: " + e.toString());
		}
	}
	
	

	
	
	
}
