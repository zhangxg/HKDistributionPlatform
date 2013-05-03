package com.hk.distribution.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/pf")
public class ProductFormController {

	@RequestMapping("configur")
	public ModelAndView productFormConfigur(){
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("productform/pf-maintain");
		return mav;
	}
	
	 	@RequestMapping("/generate")
	    @ResponseBody
	    public String generateTemplate(@RequestParam("id") String[] id) {
	 		System.out.println(id);
	 		
	 		/**start using jsoup generate html**/
	 		try{
	 			Document doc = Jsoup.connect("http://localhost:8080/DistributionPlatform/").get();
	 		}catch(Exception e){
	 			
	 		}
	 		
	        return "{'success':true}";
	    }
	
}
