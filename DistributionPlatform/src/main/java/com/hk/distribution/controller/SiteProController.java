package com.hk.distribution.controller;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.hk.distribution.model.Site;
import com.hk.distribution.service.SiteService;

@Controller
@RequestMapping("/sitepro")
public class SiteProController {
	
	private static final String FILE_PART1="D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\WEB-INF\\pages\\outputPart1.html"; 
	private static final String FILE_PART2="D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\WEB-INF\\pages\\outputPart2.html"; 
	
	private static final String PRODUCT_HOME_PAGE="http://baoxian.taobao.com/item.htm?spm=a1z10.1.w3-17997563234.2.cX2gpF&id=22713004906&bucket_id=19";
	@Autowired
    private SiteService siteService;

    @RequestMapping("/edit")
    public ModelAndView editSitePro() {

        ModelAndView mav = new ModelAndView();

        mav.setViewName("sitepro/chooser");
        return mav;
    }
    
    @RequestMapping("/savehtml")
    public String savehtml(HttpServletRequest request, @RequestParam("id") String[] images, @RequestParam("siteid") String siteid, @RequestParam("pid") String[] products) {
    	
    	//public String savehtml(HttpServletRequest request,@RequestParam("id") String[] images, @RequestParam("siteid") String siteid, @RequestParam("pid") String[] products) {
    	  
    	String fullURL=request.getRequestURL().toString();
    	String contextPath=request.getContextPath();
    	int indexCon=fullURL.indexOf(contextPath);
    	contextPath=fullURL.substring(0,indexCon+contextPath.length()+1);
    	String line;
    	BufferedReader br=null;
    	StringBuffer temp = new StringBuffer();
    	// part1----------------
		try {
			br = new BufferedReader(new FileReader(new File(FILE_PART1)));
		} catch (FileNotFoundException e1) {
			System.out.println("*********************FILE_PART1 file path error!");
			e1.printStackTrace();
		}
		
    	try {
			while((line = br.readLine()) != null) {
				temp.append(line).append("\n");
			}
			br.close();
			System.out.println("*********************read first part success!");
			
		} catch (IOException e) {
			System.out.println("*********************read first part error!");
			e.printStackTrace();
		}
    	
    	
    	System.out.println(images);
    	
    	Site site = new Site();
        site.setAddress(siteid);
        List<Site> list=siteService.getSite(site);
        site=list.get(0);
        
        int showType=site.getShowType();
        System.out.print("88888888888888888888888888 site " +site.getAddress() + " show type is :"+showType);
    	String htmlStr="";
    	
    	htmlStr+=contextPath+"resources/js/SlideTrans.js\"></script>\n";
    	htmlStr+="</head>\n";
    	htmlStr+="<body style=\"margin: 0px;\">\n";
    	htmlStr+="<link rel=\"stylesheet\" type=\"text/css\" href=\"" +contextPath+"resources/css/slideTrans.css\"/>\n";
    	htmlStr+="<div class=\"container\" id=\"idContainer2\">\n";
    	htmlStr+="<ul id=\"idSlider2\">\n";
    	
    	int i=0;
    	for(;i<images.length;i++){
    		htmlStr+="<li>";
    		if(showType==1){
    			htmlStr+="<a href=\""+PRODUCT_HOME_PAGE+"\" target=\"_blank\">";
    		}else if(showType==3){
    			htmlStr+="<a href=\""+contextPath+"products/"+products[i]+"/index.html\" target=\"_blank\">";
    		}else if(showType==2){
    			htmlStr+="<a href=\"http://117.128.183.102/products/index.html?phtml="+contextPath+"products/"+products[i]+"/index.html\" target=\"_blank\">";
    		}
    		 
    		htmlStr+="<img src=\""+contextPath+"resources/img/product/"+images[i]+"\"/></a>";
    		htmlStr+="</li>\n";
    	}
    	temp=temp.replace(temp.length()-1, temp.length(), "");
    	temp.append(htmlStr);
    	
    	// part2------------
    	try {
			br = new BufferedReader(new FileReader(new File(FILE_PART2)));
		} catch (FileNotFoundException e1) {
			System.out.println("*********************FILE_PART2 file path error!");
			e1.printStackTrace();
		}
    	
    	try {
			while((line = br.readLine()) != null) {
				temp.append(line).append("\n");
			}
			br.close();
			System.out.println("*********************read 2nd part success!");
			
		} catch (IOException e) {
			System.out.println("*********************read first part error!");
			e.printStackTrace();
		}
    	
    	BufferedWriter bw=null;
    	try {
    		File siteDir = new File("D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\siteproducthtml\\"+siteid);
            if (!siteDir.exists()) {
            	siteDir.mkdirs();
            }
			bw = new BufferedWriter(new FileWriter(new File("D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\siteproducthtml\\"+siteid+"\\index.html")));
			System.out.println("***************************** URL: "+contextPath);
			System.out.println("***************************** Target URI: "+"D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\siteproducthtml\\"+siteid+"\\index.html");
			System.out.println(temp.toString());
			bw.write(temp.toString());
			bw.close();
		} catch (IOException e1) {
			System.out.println("*********************create output file error!");
			e1.printStackTrace();
		}
    	

        return "{'success':true}";
    }
}
