package com.hk.distribution.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hk.distribution.model.Site;
import com.hk.distribution.service.SiteService;

@Controller
@RequestMapping("/site")
public class SiteController {

    @Autowired
    private SiteService siteService;

    @RequestMapping("/list")
    public ModelAndView listSite() {

        ModelAndView mav = new ModelAndView();

        mav.setViewName("site/list");
        return mav;
    }

    @RequestMapping("/save")
    @ResponseBody
    public String saveSite(String editType, String address, String showType, String targetURI) {

        Site site = new Site();
        site.setAddress(address);
        site.setShowType(Integer.valueOf(showType));
        site.setTargetURI(targetURI);

        if ("1".equals(editType)) {

            siteService.saveSite(site);
        } else if ("2".equals(editType)) {

            siteService.updateSite(site);
        }

        return "{'success':true}";
    }
    
    @RequestMapping("/delete")
    @ResponseBody
    public String deleteSite(String address) {
        
        String[] rets = address.split(",");
        siteService.deleteSiteByAdress(Arrays.asList(rets));
        
        return "{'success':true}";
    }

    @RequestMapping("/json/list")
    @ResponseBody
    public List<Site> getSiteListByJson() {

        List<Site> list = siteService.getSiteList();
        return list;
    }
}
