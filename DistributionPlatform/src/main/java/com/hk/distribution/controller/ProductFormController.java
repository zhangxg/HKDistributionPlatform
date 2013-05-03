package com.hk.distribution.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
