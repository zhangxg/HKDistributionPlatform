package com.hk.distribution.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/sitepro")
public class SiteProController {

    @RequestMapping("/edit")
    public ModelAndView editSitePro() {

        ModelAndView mav = new ModelAndView();

        mav.setViewName("sitepro/chooser");
        return mav;
    }
}
