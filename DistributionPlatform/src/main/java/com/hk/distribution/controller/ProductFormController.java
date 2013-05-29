package com.hk.distribution.controller;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hk.distribution.model.FormAttribute;
import com.hk.distribution.model.FormConfig;
import com.hk.distribution.service.ProductFormService;

@Controller
@RequestMapping("/pf")
public class ProductFormController {

	private static final String PRODUCT_DIR = "D:\\Work\\GitHubWorkPlace\\HKDistributionPlatform\\DistributionPlatform\\src\\main\\webapp\\products\\";

	@Autowired
	private ProductFormService proFormService;
	
	@RequestMapping("configur")
	public ModelAndView productFormConfigur() {

		ModelAndView mav = new ModelAndView();
		mav.setViewName("productform/pf-maintain");
		return mav;
	}

	@RequestMapping("maintainFormAttributes")
	public ModelAndView maintainFormAttributes() {

		ModelAndView mav = new ModelAndView();
		mav.setViewName("productform/formAttributesList");
		return mav;
	}
	
	@RequestMapping("/save")
    @ResponseBody
    public String saveAttribute(String name, String type, String options, String required) {

        FormAttribute attr = new FormAttribute();
        
        attr.setName(name);
        attr.setType(type);
        attr.setOptions(options);
        attr.setRequired(required);
		this.proFormService.saveFormAttribute(attr);

        return "{'success':true}";
    }

	@RequestMapping("/json/listAttr")
	@ResponseBody
	public List<FormAttribute> listFormAttributes() {
		
		return proFormService.listFormAttributes();

//		List<FormAttribute> list = new ArrayList<FormAttribute>();
//
//		FormAttribute attr = new FormAttribute();
//		attr.setName("姓名");
//		attr.setType("普通文本");
//		attr.setOptions("n/a");
//		attr.setRequired("是");
//		list.add(attr);
//		return list;
	}

	@RequestMapping("/generate")
	@ResponseBody
	public String generateTemplate(HttpServletRequest request,
			@RequestParam("id") String[] id, @RequestParam("pt") String pt) {

		String fullURL = request.getRequestURL().toString();
		String contextPath = request.getContextPath();
		int indexCon = fullURL.indexOf(contextPath);
		contextPath = fullURL.substring(0, indexCon + contextPath.length() + 1);

		StringBuffer innerHTML = new StringBuffer();
		String templatePath = contextPath + "template/FormDemo.html";
		/** start using jsoup generate html **/
		try {
			Document doc = Jsoup.parse(new URL(templatePath).openStream(),
					"GBK", templatePath);
			Elements dynamicForm = doc.select("div#dynamicForm");
			innerHTML.append("<h3>填写联系信息<br/><em>请告诉我们您的联系方式。</em></h3>");
			for (String input : id) {

				Map<String, String> formMap = FormConfig.getFormElement();
				for (Map.Entry<String, String> entry : formMap.entrySet()) {
					if (input.equals(entry.getKey().toString())) {
						innerHTML.append(entry.getValue());
					}
				}
			}
			dynamicForm.prepend(innerHTML.toString());
			String html = doc.html();
			html = html.replaceAll("##constpath##", contextPath);
			System.out.println("***************************************");
			System.out.println(html);
			System.out.println("***************************************");
			File siteDir = new File(PRODUCT_DIR + pt);
			if (!siteDir.exists()) {
				siteDir.mkdirs();
			}
			FileUtils.writeStringToFile(new File(PRODUCT_DIR + pt
					+ "\\index.html"), html);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return "{'success':true}";
	}

}
